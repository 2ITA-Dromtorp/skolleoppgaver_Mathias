const express = require('express');
const app = express();
const port = 3000;

// Middleware for å parse URL-forespørsler
app.use(express.urlencoded({ extended: true }));

// Databasekobling (erstatt med din egen databasekonfigurasjon)
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dromtorp'
});

// Forside
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Innloggingsside
app.post('/login', (req, res) => {
    const { brukernavn, passord } = req.body;
    // Sjekk om brukernavn og passord finnes i databasen
    connection.query('SELECT * FROM Elever WHERE Brukernavn = ? AND Passord = ?', [brukernavn, passord], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Innlogging vellykket som elev');
        } else {
            connection.query('SELECT * FROM Lærere WHERE Brukernavn = ? AND Passord = ?', [brukernavn, passord], (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    res.send('Innlogging vellykket som lærer');
                } else {
                    res.send('Feil brukernavn eller passord');
                }
            });
        }
    });
});

// Start serveren
app.listen(port, () => {
    console.log(`Serveren kjører på http://localhost:${port}`);
});
