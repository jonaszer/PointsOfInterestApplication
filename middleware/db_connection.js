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

        //--------- SIMPLE REST API ---------//

        // To look up all the points of interest in a given region

        app.get('/pointsofinterest/:region', (req, res) => {
            connection.query('SELECT * FROM pointsofinterest WHERE region = ?', [req.params.region], (error, results) => {
                if (error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });

        // Add new point of interest

        app.post('/pointsofinterest/create', (req, res) => {
            connection.query('INSERT INTO pointsofinterest(name, type, country, region, lon, lat, description) VALUES (?,?,?,?,?,?,?)',
                [req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description],
                (error, results, fields) => {
                    if (error) {
                        res.status(500).json({ error: error });
                    } else {
                        res.json({ success: 1 });
                    }
                });
        });

        // To recommend point of interest

        app.post('/pointsofinterest/:id', (req, res) => {
            connection.query('UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE ID=?', [req.params.id], (error, results) => {
                if (error) {
                    res.status(500).json({ error: error });
                } else if (results.affectedRows == 1) {
                    res.json({ 'Message': 'Successfully recommended.' });
                } else {
                    res.status(404).json({ error: 'No recommendations added, could not find a record matching that ID.' });
                }
            });
        });

        app.listen(3000);
    }
});

module.exports = connection;