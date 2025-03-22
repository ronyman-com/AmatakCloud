const { User } = require('../../database/models');
const logger = require('../../utils/logger'); // Custom logger for structured logging

/**
 * Authenticate a user using their API key.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticate = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Check if API key is provided
    if (!apiKey) {
        logger.error('API key is required.');
        return res.status(401).json({ error: 'API key required' });
    }

    try {
        // Find the user by API key
        const user = await User.findByApiKey(apiKey);
        if (!user) {
            logger.error(`Invalid API key: ${apiKey}`);
            return res.status(401).json({ error: 'Invalid API key' });
        }

        // Attach the user object to the request
        req.user = user;
        logger.info(`User authenticated: ${user.email}`);
        next();
    } catch (err) {
        logger.error(`Error authenticating user: ${err.message}`);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};

module.exports = authenticate;