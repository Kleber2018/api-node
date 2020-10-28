var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vizinhandoapp.firebaseio.com"
});

const db = admin.firestore();

class CSVToJSONController {

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

    async testParallelIndividualWrites(datas) {
        await Promise.all(datas.map((data) => db.collection('equipamento').add(data)));
    }
}




export default new CSVToJSONController;
