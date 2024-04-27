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
  const borrowQuery = 'UPDATE Utstyr SET Tilgjengelig = Tilgjengelig - 1 WHERE UtstyrID = ? AND Tilgjengelig > 0';
  connection.query(borrowQuery, [UtstyrID], (error, result) => {
    if (error) {
      console.error('Error borrowing equipment:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else if (result.affectedRows === 0) {
      // No available equipment
      res.status(400).json({ message: 'No available equipment' });
    } else {
      // Equipment borrowed successfully
      const insertQuery = 'INSERT INTO Utlån (ElevID, UtstyrID, Utlånsdato) VALUES (?, ?, NOW())';
      connection.query(insertQuery, [ElevID, UtstyrID], (insertError, insertResult) => {
        if (insertError) {
          console.error('Error inserting into Utlån table:', insertError);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Equipment borrowed successfully' });
        }
      });
    }
  });
});

// Endpoint for returning equipment
app.post('/return', (req, res) => {
  const { UtlånID, UtstyrID } = req.body;

  // Check if the item has already been returned
  const checkQuery = 'SELECT Returdato FROM Utlån WHERE UtlånID = ?';
  connection.query(checkQuery, [UtlånID], (checkError, checkResult) => {
    if (checkError) {
      console.error('Error checking return status:', checkError);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (checkResult.length === 0 || checkResult[0].Returdato !== null) {
        res.status(400).json({ message: 'Item has already been returned' });
      } else {
        // Update the database to mark the item as returned
        const returnQuery = 'UPDATE Utstyr SET Tilgjengelig = Tilgjengelig + 1 WHERE UtstyrID = ?';
        connection.query(returnQuery, [UtstyrID], (error, result) => {
          if (error) {
            console.error('Error returning equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            const updateQuery = 'UPDATE Utlån SET Returdato = NOW(), Godkjent = 1 WHERE UtlånID = ?';
            connection.query(updateQuery, [UtlånID], (updateError, updateResult) => {
              if (updateError) {
                console.error('Error updating Utlån table:', updateError);
                res.status(500).json({ message: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Equipment returned successfully' });
              }
            });
          }
        });
      }
    }
  });
});

// Endpoint for fetching borrowed equipment for a specific student ID
app.get('/borrowed/:elevId', (req, res) => {
  const elevId = req.params.elevId;
  const query = `
    SELECT Utstyr.*, Utlån.UtlånID, Utlån.Utlånsdato, Utlån.Returdato, Utlån.Godkjent
    FROM Utstyr
    JOIN Utlån ON Utstyr.UtstyrID = Utlån.UtstyrID
    WHERE Utlån.ElevID = ? AND Utlån.Returdato IS NULL AND Utlån.Godkjent = 0
  `;
  connection.query(query, [elevId], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
