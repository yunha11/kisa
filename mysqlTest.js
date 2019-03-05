var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rootpwd135!',
  database : 'kisapay'
});
 
connection.connect();
 
connection.query('SELECT iduser FROM kisapay.user where userid="kisa01"', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();