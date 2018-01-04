var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');

var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/papers', function (req, res) {
  let selection = req.body === undefined ? '*' : req.body.title === undefined ? '*' : req.body.title;
  db.selectPapers(selection, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

