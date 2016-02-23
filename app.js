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

      // Clone the topics array into a subset to reduce traffic
      var topicsArr=[];
      for (var i in json.topics) {
        var topic=json.topics[i];
	topicsArr[topicsArr.length]={
          label:topic.label,
	  volume:topic.volume,
	  sentimentScore:topic.sentimentScore,
          sentiment:topic.sentiment
	};
      }
      res.json({topics:topicsArr});
  });
});

app.listen(3001, function () {
  console.log('listening on port 3000!');
});
