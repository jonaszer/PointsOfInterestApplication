const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assignment'
});

connection.connect(err => {
    if (err) {
        console.log(`Error connecting to mysql database: ${err}`);
        process.exit(1);
    } else {
        console.log('Connected to the database...');
    }
});

module.exports = connection;