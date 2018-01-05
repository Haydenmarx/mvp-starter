var mysql = require('mysql');
var secret = require('./config.js')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : secret.password,
  database : 'ethics'
});

var selectPapers = function(title, callback) {
  var query = title === '*' ? 'SELECT * FROM papers' : 'SELECT * FROM papers WHERE title = ?'
  title = title === '*' ? '' : title;
  connection.query(query, title, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addPapers = function(title, callback) {
  var query = title === '*' ? 'SELECT * FROM papers' : 'SELECT * FROM papers WHERE title = ?'
  title = title === '*' ? '' : title;
  connection.query(query, title, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var updatePapers = function(title, callback) {
  var query = title === '*' ? 'SELECT * FROM papers' : 'SELECT * FROM papers WHERE title = ?'
  title = title === '*' ? '' : title;
  connection.query(query, title, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectPapers = selectPapers;
