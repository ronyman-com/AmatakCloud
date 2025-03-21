const db = require('../../config/database');

class Domain {
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS domains (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                domain_name TEXT NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`;
        return db.run(sql);
    }

    static create(userId, domainName) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO domains (user_id, domain_name)
                VALUES (?, ?)`;
            db.run(sql, [userId, domainName], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    static findByUserId(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM domains WHERE user_id = ?';
            db.all(sql, [userId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Domain;