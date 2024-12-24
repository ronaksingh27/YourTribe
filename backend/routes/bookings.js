// File: routes/bookings.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Create Booking
router.post('/', async (req, res) => {
    const { userId, activityId } = req.body;
    try {
        await pool.query('BEGIN');

        const activityResult = await pool.query(
            'SELECT spots_remaining FROM activities WHERE id = $1',
            [activityId]
        );

        if (activityResult.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const spotsRemaining = activityResult.rows[0].spots_remaining;
        if (spotsRemaining <= 0) {
            return res.status(400).json({ error: 'No spots remaining' });
        }

        await pool.query(
            'UPDATE activities SET spots_remaining = spots_remaining - 1 WHERE id = $1',
            [activityId]
        );

        const bookingResult = await pool.query(
            'INSERT INTO bookings (user_id, activity_id) VALUES ($1, $2) RETURNING *',
            [userId, activityId]
        );

        await pool.query('COMMIT');
        res.status(201).json(bookingResult.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
});

module.exports = router;