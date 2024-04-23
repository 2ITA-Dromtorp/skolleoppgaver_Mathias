const mysql = require('mysql');

const dbConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dromtorp'
});

dbConfig.connect((error) => {
    if (error) {
        console.error('Feil ved tilkobling til databasen: ' + error.stack);
        return;
    }
    console.log('Tilkoblet til databasen med ID ' + dbConfig.threadId);
});

module.exports = dbConfig;
