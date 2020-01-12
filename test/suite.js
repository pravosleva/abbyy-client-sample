// Test suite for ABBYY's OCR-SDK. See http://ocrsdk.com/

var assert = require('assert');
var path = require('path');
var dotenv = require('dotenv');
var fs = require('fs');
const cfg = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env.abbyy')))
for (const k in cfg) process.env[k] = cfg[k];
const ABBYY_APP_ID = process.env.ABBYY_APP_ID || '<ABBYY_APP_ID>';
const ABBYY_APP_PASSWORD_ID = process.env.ABBYY_APP_PASSWORD_ID || '<ABBYY_APP_PASSWORD_ID>';

if (!ABBYY_APP_ID || !ABBYY_APP_PASSWORD_ID) {
  assert.fail('Must specify ABBYY_APP_ID and ABBYY_APP_PASSWORD_ID environment variables to run tests.');
  return;
}

// WAY 1: 2012
// var AbbyyOcr = require('../abbyy-ocr');

// WAY 2: 2017-12
var AbbyyClient = require('nodejs-ocr');

// WAY 1: 2012
// var ocr = new AbbyyOcr(appId, password);

// WAY 2: 2017
const client = new AbbyyClient(ABBYY_APP_ID, ABBYY_APP_PASSWORD_ID, 'https://cloud.ocrsdk.com');
const options = {
  imageSource: 'auto',
  exportFormat: 'txt',
};

describe('AbbyyOcr', function() {
  describe('#processImage', function() {
    it('should return the text in the sample image', function(done) {
      this.timeout(1000000); // set a high timeout, as terapeak is sometimes a bit slow to respond.

      client.processImage(options, `${__dirname}/sample_images/MobPhoto_4.jpg`, function(err, text) {
        if (err) assert.fail(err);

        // console.log(text); // Buffer

        // This sample has a whole block of text. Let's just make sure some of the key phrases are present:
        assert(text.indexOf('Capture Front-ends Linked to Backend') > 0);
        done();
      });
    });
  });
});
