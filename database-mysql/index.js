var mysql = require('mysql');
var password = require('./config.js')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : password,
  database : 'test'
});

var selectPapers = function(title='*', callback) {
  let selection = title;
  let query = 'SELECT ? FROM papers';
  connection.query(query, [selection], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectPapers = selectPapers;
