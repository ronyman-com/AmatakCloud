const db = require('../../config/database');

class User {
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password_hash TEXT,
                api_key TEXT UNIQUE
            )`;
        return db.run(sql);
    }

    static create(email, passwordHash, apiKey) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO users (email, password_hash, api_key)
                VALUES (?, ?, ?)`;
            db.run(sql, [email, passwordHash, apiKey], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    static findByApiKey(apiKey) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE api_key = ?';
            db.get(sql, [apiKey], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = User;