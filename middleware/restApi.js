const express = require('express');
const router = express.Router();
const connection = require('../middleware/db_connection')
const cors = require('cors');

router.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE']
}));


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

router.post('/create', (req, res, next) => {
    if (!Object.values(req.body)[0] && !Object.values(req.body)[1] && !Object.values(req.body)[2] && !Object.values(req.body)[3] && !Object.values(req.body)[4] && !Object.values(req.body)[5] && !Object.values(req.body)[6]) {
        res.status(400).json({ 'Message': 'All input fields must be filled!' });
        return next(res);
    } else if (!Object.values(req.body)[0]) {
        res.status(400).json({ 'Message': 'Location Name cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[1]) {
        res.status(400).json({ 'Message': 'Location Type cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[2]) {
        res.status(400).json({ 'Message': 'Location Country cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[3]) {
        res.status(400).json({ 'Message': 'Location Region cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[4]) {
        res.status(400).json({ 'Message': 'Location Lon cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[5]) {
        res.status(400).json({ 'Message': 'Location Lat cannot be empty!' });
        return next(res);
    } else if (!Object.values(req.body)[6]) {
        res.status(400).json({ 'Message': 'Location Description cannot be empty!' });
        return next(res);
    } else {
        connection.query('INSERT INTO pointsofinterest(name, type, country, region, lon, lat, description) VALUES (?,?,?,?,?,?,?)',
            Object.values(req.body), (error, results, fields) => {
                if (error) {
                    res.status(500).json({ 'Message': 'Internal Error.' });
                } else {
                    res.status(201).json({ 'Message': 'Point of interest has been successfully added.' });
                }
            });
    }
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