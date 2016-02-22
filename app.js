var express = require('express')
var fs = require('fs');
var app = express();

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/topics.json', function (req, res) {

    readJSONFile('topics.json', function (err, json) {
      res.json(json);
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
