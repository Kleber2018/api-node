var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vizinhandoapp.firebaseio.com"
});

const db = admin.firestore();

class CSVToParseController {

     //funcionando com parse, para muitos dados, recebe o file através do body da requisição, para Arquivos CSV grande
    async explodeCSV(req, res) {
        const csv = require('csv-parser');
        const fs = require('fs');
        const stripBomStream = require('strip-bom-stream');
        var formidable = require('formidable');
        const form = formidable({ multiples: true });
        var contador = 0;

        form.parse(req);
        form.on('file', (name, file) => {
            console.log(file.path)
            const csvFilePath = file.path
            fs.createReadStream(csvFilePath)
                .pipe(stripBomStream())
                .pipe(csv({ separator: ';' }))
                .on('data', (row) => {
                    console.log(row)
                    contador = contador +1;
                    db.collection('equipamento').add(row)
                })
                .on('end', () => {
                    console.log('CSV file successfully processed', contador)
                    res.status(200).json('quantidade: '+ contador);
                    //res.send('quantidade: '+ contador);
                   // res.write('quantidade: '+ contador);
                   // res.end();
                });
        });
    }

    //NÃO FUNCIONA APRA MUITAS LINHAS
    async explodeExcel(req, res) {
        const readXlsxFile = require('read-excel-file/node');
        const fs = require('fs');
        var formidable = require('formidable');
        const form = formidable({ multiples: true });
        var contador = 0;

        //const stripBomStream = require('strip-bom-stream');

        form.parse(req);
        form.on('file', (name, file) => {
            console.log(file.path)
            const csvFilePath = file.path

            readXlsxFile(fs.createReadStream(csvFilePath)).then((rows) => {
                rows.map((row) => {
                    console.log(row)
                    contador = contador +1;
                    res.status(200).json('quantidade: '+ contador);
                })

            })


/*
            readXlsxFile(fs.createReadStream(csvFilePath)).then((rows) => {
                console.log(rows)
                contador = contador +1;
                res.status(200).json('quantidade: '+ contador);
            })*/
        });
    }

    //não funciona
    async explodeExcel2(req, res) {
        const fs = require('fs');
        var formidable = require('formidable');
        const form = formidable({ multiples: true });
        var contador = 0;

        //const stripBomStream = require('strip-bom-stream');

        var XLSX = require('xlsx');

        const csv = require('csv-parser');

        form.parse(req);
        form.on('file', (name, file) => {
            console.log(file.path)
            const csvFilePath = file.path
            var workBook = XLSX.readFile(csvFilePath);
            //console.log('teste', workBook);
            var jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = XLSX.utils.sheet_to_csv(sheet)

               // console.log('nameee', initial[name])

                const records = csv(initial[name], {
                    delimiter: [",","\t"],
                    trim: true,
                    columns: true,
                })
                console.log(records)

                records.forEach((rec,index) => {
                    let indent = ""
                    Object.entries(rec).forEach(([key, value]) => {
                        console.log(`${indent}${key}: <${value}>`)
                        indent = (indent.length === 0 ? "    " : indent)
                    })
                })

                return initial;
            }, {});
            //console.log(jsonData);
        });
    }


    async testParallelIndividualWrites(datas) {
        await Promise.all(datas.map((data) => db.collection('equipamento').add(data)));
    }
}




export default new CSVToParseController;
