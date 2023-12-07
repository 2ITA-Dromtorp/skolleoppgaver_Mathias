const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'dromtorp'
});



app.get('/', (req, res) => {

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

  connection.query('SELECT * from elev', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    console.log('The solution is: ', results);
    res.send(results)
  });
  
  connection.end();

 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})