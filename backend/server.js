// File: server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const admin = require('firebase-admin');

// Initialize Express App
const app = express();
app.use(bodyParser.json());

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

// Initialize PostgreSQL Pool
const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'loneliness_relief',
    password: 'your_password',
    port: 5432,
});

// Import routes
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');
const bookingRoutes = require('./routes/bookings');

// Use routes
app.use('/users', userRoutes);
app.use('/activities', activityRoutes);
app.use('/bookings', bookingRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
