// File: db/index.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'loneliness_relief',
    password: 'password',
    port: 5432,
});

module.exports = { pool };
