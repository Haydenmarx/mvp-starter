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
  // console.log(connection);
  connection.query(query, title, function(err, results, fields) {
    if(err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addPapers = function(title, body, callback) {
  var post  = {title: title, body: body};
  var query = 'INSERT INTO papers SET ?'
  connection.query(query, post, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var updatePapers = function(title, body, id, callback) {
  console.log('title: ', title, '. body: ', body, '. id:', id)
  var query = 'UPDATE papers SET title = ?, body = ? WHERE id = ?';
  connection.query(query, [title, body, id], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectPapers = selectPapers;
module.exports.addPapers = addPapers;
module.exports.updatePapers = updatePapers;
