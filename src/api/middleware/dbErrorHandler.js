const logger = require('../../utils/logger'); // Custom logger for structured logging

/**
 * Handle database errors.
 * @param {Object} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const dbErrorHandler = (err, req, res, next) => {
    // Log the error
    logger.error(`Database error: ${err.message}`);

    // Handle specific database errors
    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Database constraint failed', details: err.message });
    }

    // Handle other database errors
    res.status(500).json({ error: 'Database operation failed', details: err.message });
};

module.exports = dbErrorHandler;
