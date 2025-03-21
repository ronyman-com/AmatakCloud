const db = require('../../config/database');

class Deployment {
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS deployments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                repo_url TEXT NOT NULL,
                status TEXT NOT NULL,
                logs TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`;
        return db.run(sql);
    }

    static create(userId, repoUrl, status, logs) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO deployments (user_id, repo_url, status, logs)
                VALUES (?, ?, ?, ?)`;
            db.run(sql, [userId, repoUrl, status, logs], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    static findByUserId(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM deployments WHERE user_id = ?';
            db.all(sql, [userId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Deployment;