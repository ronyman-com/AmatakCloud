const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Resolve the database path
const dbPath = process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '../../', process.env.TEST_DATABASE_PATH)
    : path.resolve(__dirname, '../../', process.env.DATABASE_PATH);

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database at', dbPath);
    }
});

module.exports = db;