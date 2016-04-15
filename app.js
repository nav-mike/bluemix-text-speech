/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var watson = require('watson-developer-cloud');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var text_to_speech = watson.text_to_speech({
  username: '2708ef67-26c2-439a-9c45-1346c596db4a',
  password: 'PWwpyfPGO8ly',
  version: 'v1'
});

app.post('/q.json', urlencodedParser, function(req, res) {
  console.log(req.body);
  var url = req.body.url;
  var json = {title: ''};

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      $('#title').filter(function() {
        var data = $(this);

        json.title = data.text();
        console.log(json);

        var params = {
          text: json.title,
          voice: 'en-US_AllisonVoice', // Optional voice
          accept: 'audio/wav'
        };

        // Pipe the synthesized text to a file
        text_to_speech.synthesize(params).pipe(fs.createWriteStream('./public/resources/output.wav'));

        var filePath = './public/resources/output.wav';
        var stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'audio/wav',
            'Content-Length': stat.size
        });

        var readStream = fs.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);
      });
    }
  });
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
