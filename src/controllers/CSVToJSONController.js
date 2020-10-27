import Ocurrence from '../models/Ocurrence';

import User from '../models/User';

// v1
const csvtojsonV1=require("csvtojson/v1");
// v2
const csvtojsonV2=require("csvtojson");
//const csvtojsonV2=require("csvtojson/v2");

const csv=require('csvtojson')

class CSVToJSONController {

     //funcionando com parse, para muitos dados, recebe o file através do body da requisição, para Arquivos CSV grande
    async explodeCSV(req, res) {
        const csv = require('csv-parser');
        const fs = require('fs');
        var formidable = require('formidable');
        const form = formidable({ multiples: true });
        var contador = 0;

        form.parse(req);
        form.on('file', (name, file) => {
            console.log(file.path)
            const csvFilePath = file.path
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    console.log(row)
                    contador = contador +1;
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

}




export default new CSVToJSONController;
