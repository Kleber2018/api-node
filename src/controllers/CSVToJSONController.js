import Ocurrence from '../models/Ocurrence';

import User from '../models/User';

// v1
const csvtojsonV1=require("csvtojson/v1");
// v2
const csvtojsonV2=require("csvtojson");
//const csvtojsonV2=require("csvtojson/v2");

const csv=require('csvtojson')

class CSVToJSONController {

  async converter(req, res) {
    const teste = 'testando'


    const csvFilePath="../p.csv"
    console.log(csvFilePath)
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
          console.log(jsonObj);
          res.send(jsonObj);
          //return res.status(200).json(jsonObj);
          /**
           * [
           *     {a:"1", b:"2", c:"3"},
           *     {a:"4", b:"5". c:"6"}
           * ]
           */
        })


    return res.status(200).json(teste);
  }


  async converterpoucosdados(req, res) {

      var formidable = require('formidable');
      var form = new formidable.IncomingForm({ multiples: true });
      form.parse(req, async function (err, fields, files) {
          const csvFilePath = files.p.path
          console.log('teste2', csvFilePath)
          csv()
              .fromFile(csvFilePath)
              .then((jsonObj)=>{
                  console.log(jsonObj.length)
                  res.send('jsonObj');
              })
         // res.write('File uploaded');
          //res.end();
      });
  }


    async convertermuitosdados(req, res) {
        var formidable = require('formidable');
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            const csvFilePath = files.p.path
            console.log('teste2', csvFilePath)
            csv()
                .fromFile(csvFilePath)
                .subscribe((json)=>{
                    console.log('json', json)
                    return new Promise((resolve,reject)=>{
                        console.log('resolv',resolve)
                        res.send('jsonObj');
                        // Async operation on the json
                        // don't forget to call resolve and reject
                    })
                })
            // res.write('File uploaded');
            //res.end();
        });
    }

    async convertermuitosdados2(req, res) {
        const csv = require('csv-parser');
        const fs = require('fs');
        var formidable = require('formidable');
        var form = new formidable.IncomingForm({ multiples: false });
        var formfields = await new Promise(function (resolve, reject) {
            form.parse(req, function (err, fields, files) {
                resolve(files.p.path)

                const csvFilePath = files.p.path
                //console.log('teste2', csvFilePath)
                // fs.createReadStream(csvFilePath)
                //     .pipe(csv())
                //     .on('data', (row) => {
                //         console.log(row)
                //     })
                //     .on('end', () => {
                //         console.log('CSV file successfully processed')
                //         //res.send('fim');
                //     });
                // // res.write('File uploaded');
                // //res.end();
            });
        });

        console.log('form', formfields)
        res.write('File uploaded');
        res.end();
    }



  async converter2(req, res) {
    const teste = 'testando'


    const request=require('request')
    const csv=require('csvtojson')

    csv()
        .fromStream(request.get('https://firebasestorage.googleapis.com/v0/b/sse-eletromecanica.appspot.com/o/PREVENTIVA.csv?alt=media&token=2c1a1d13-76f9-4686-b753-fa862a4c9496'))
        .subscribe((json)=>{
          return new Promise((resolve,reject)=>{
            console.log(resolve)
            // long operation for each json e.g. transform / write into database.
          })
        },onError,onComplete);


    return res.status(200).json(teste);
  }


}




export default new CSVToJSONController;
