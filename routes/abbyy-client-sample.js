const express = require('express');
const router = express.Router();

/**
 * ABBYY
 */

const AbbyyClient = require('nodejs-ocr');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const cfg = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env.abbyy')))
for (const k in cfg) process.env[k] = cfg[k];
const { ABBYY_APP_ID, ABBYY_APP_PASSWORD_ID } = process.env;


if (!ABBYY_APP_ID || !ABBYY_APP_PASSWORD_ID) {
  // process.exit(1);
  return;
}
const client = new AbbyyClient(ABBYY_APP_ID, ABBYY_APP_PASSWORD_ID, 'https://cloud.ocrsdk.com');

let apiParameters = {
  language: 'English',
  profile:  'textExtraction',
  textType: 'typewriter',
  exportFormat: 'xml'
  // etc...
};

/* GET home page. */
router.get('/', function(req, res, next) {
  let result = null;
  // function ocrComplete(err, results) {
  //   if (!err) {
  //     console.log(results.toString()); // Raw results of completed Task (or a TaskId for submitImage calls)
  //     result = results;
  //   }
  // }

  // client.processImage(apiParameters, './localFile.png', ocrComplete); // Buffers can also be passed

  res.send({
    // result,
    ABBYY_APP_ID,
    ABBYY_APP_PASSWORD_ID,
  });
});

module.exports = router;
