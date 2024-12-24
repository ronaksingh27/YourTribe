// File: routes/activities.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get Activities
router.get('/', async (req, res) => {
    const { category, location } = req.query;
    let query = 'SELECT * FROM activities WHERE true';
    const params = [];

    if (category) {
        params.push(category);
        query += ` AND category = $${params.length}`;
    }

    if (location) {
        params.push(location);
        query += ` AND location = $${params.length}`;
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving activities:', error);
        res.status(500).json({ error: 'Error retrieving activities' });
    }
});

module.exports = router;
