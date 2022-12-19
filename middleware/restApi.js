const express = require('express');
const router = express.Router();
const connection = require('../middleware/db_connection')


//--------- SIMPLE REST API ---------//

// To look up all the points of interest in a given region


router.get('/:region', (req, res) => {
    connection.query('SELECT * FROM pointsofinterest WHERE region = ?', [req.params.region], (error, results) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

// Add new point of interest

router.post('/create', (req, res) => {
    connection.query('INSERT INTO pointsofinterest(name, type, country, region, lon, lat, description) VALUES (?,?,?,?,?,?,?)',
        Object.values(req.body), (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json({ success: 1 });
            }
        });
});

// To recommend point of interest

router.post('/:id', (req, res) => {
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

module.exports = router;