const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dromtorp'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', async (request, response) => {

  let data = request.body;

  let username = data.username;
  let passord = data.password;
 

  response.send('Takk for post request!')
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});