const dbErrorHandler = (err, req, res, next) => {
    console.error('Database error:', err.message);

    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Database constraint failed' });
    }

    res.status(500).json({ error: 'Database operation failed' });
};

module.exports = dbErrorHandler;