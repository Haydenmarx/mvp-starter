var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');

var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/papers', function (req, res) {
  let selection = req.url.slice(8).length === 0 ? '*' : toSpace(req.url.slice(8));
  db.selectPapers(selection, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/papers', function (req, res) {
  if ('request:', req.body.id === 'new') {
    db.addPapers(req.body.title, req.body.body, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  } else {
    db.updatePapers(req.body.title, req.body.body, req.body.id, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  }
  //req.body.title, req.body.body
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

var toSpace = (str) => {
  return str.replace(/(%20)/g, (word)=>{
    return ' ';
  });
};