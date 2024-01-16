const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

app.use(express.static('build'));
app.use(express.json());

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'mlem',
  host: 'localhost',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (err) {
        console.error('Connection failed!');
        throw err;
    }
    console.log('Connected to MySQL database!');
});



app.get('/', (req, res) => {
  const sql = 'SELECT * FROM elev';
  connection.query(sql, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      console.log(JSON.stringify(result));
      console.log(result);
      res.json(result); // Send as JSON
  });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log('Server started' + PORT);
// })

  // function (err) {
  //   if (err) throw err;
  //   console.error('Failed!');
  // });
  
  // connection.end();