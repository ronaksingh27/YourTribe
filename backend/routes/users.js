// File: routes/users.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// User Registration
router.post('/', async (req, res) => {
    const { firebaseUid, name, photoUrl, interests } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (firebase_uid, name, photo_url, interests) VALUES ($1, $2, $3, $4) RETURNING *',
            [firebaseUid, name, photoUrl, interests]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
});

module.exports = router;