const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

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

// Endpoint for handling user registration
app.post('/register', (req, res) => {
  const { brukernavn, passord, navn, klasse, pårørende, telefonnummer } = req.body;

  // Check if all required fields are provided
  if (!brukernavn || !passord || !navn || !klasse || !pårørende || !telefonnummer) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Check if the username already exists in the database
  const usernameCheckQuery = 'SELECT * FROM Elever WHERE Brukernavn = ?';
  connection.query(usernameCheckQuery, [brukernavn], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length > 0) {
      // Username already exists
      res.status(400).json({ message: 'Username already exists' });
    } else {
      // Insert the new user into the database
      const insertQuery = 'INSERT INTO Elever (Navn, Klasse, Brukernavn, Passord, Pårørende, Telefonnummer) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(insertQuery, [navn, klasse, brukernavn, passord, pårørende, telefonnummer], (insertError, result) => {
        if (insertError) {
          console.error('Error inserting into database:', insertError);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          // Registration successful
          res.status(200).json({ message: 'Registration successful' });
        }
      });
    }
  });
});

// Endpoint for handling user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Elever WHERE Brukernavn = ?';

  connection.query(query, [username], async (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length > 0) {
      const user = results[0];
      if (password === user.Passord) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// Endpoint for fetching equipment data
app.get('/equipment', (req, res) => {
  const query = 'SELECT * FROM Utstyr';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint for borrowing equipment
app.post('/borrow', (req, res) => {
  const { ElevID, UtstyrID } = req.body;
  const borrowQuery = 'INSERT INTO utlån (ElevID, UtstyrID, Utlånsdato) VALUES (?, ?, NOW())';
  const decrementAvailabilityQuery = 'UPDATE Utstyr SET Tilgjengelig = Tilgjengelig - 1 WHERE UtstyrID = ? AND Tilgjengelig > 0';

  connection.query(borrowQuery, [ElevID, UtstyrID], (error, result) => {
    if (error) {
      console.error('Error borrowing equipment:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      connection.query(decrementAvailabilityQuery, [UtstyrID], (decError, decResult) => {
        if (decError) {
          console.error('Error decrementing availability:', decError);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          if (decResult.affectedRows === 0) {
            res.status(404).json({ message: 'No available equipment left' });
          } else {
            res.status(200).json({ message: 'Equipment borrowed successfully' });
          }
        }
      });
    }
  });
});

// Endpoint for returning equipment
app.post('/return', (req, res) => {
  const { UtlånID } = req.body;
  const returnQuery = 'UPDATE Utlån SET Returdato = NOW() WHERE UtlånID = ?';
  const incrementAvailabilityQuery = 'UPDATE Utstyr SET Tilgjengelig = Tilgjengelig + 1 WHERE UtstyrID = (SELECT UtstyrID FROM Utlån WHERE UtlånID = ?)';

  connection.query(returnQuery, [UtlånID], (error, result) => {
    if (error) {
      console.error('Error returning equipment:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      connection.query(incrementAvailabilityQuery, [UtlånID], (incError, incResult) => {
        if (incError) {
          console.error('Error incrementing availability:', incError);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Equipment returned successfully' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
