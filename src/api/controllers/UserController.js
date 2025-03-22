const User = require('../../database/models/User');
const { generateApiKey } = require('../utils/apiKeyGenerator');
const logger = require('../../utils/logger'); // Custom logger for structured logging



const UserController = {
    /**
     * Generate an API key for a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async generateApiKey(req, res) {
        const { email } = req.body;

        // Validate the email
        if (!email) {
            logger.error('Email is required.');
            return res.status(400).json({ error: 'Email is required.' });
        }

        const apiKey = generateApiKey();

        try {
            // Ensure the user table exists
            await User.createTable();

            // Save user and API key to the database
            const userId = await User.create(email, apiKey);
            logger.info(`API key generated for user: ${email}`);
            res.status(201).json({ apiKey });
        } catch (err) {
            logger.error(`Error generating API key: ${err.message}`);
            res.status(500).json({ error: 'Failed to generate API key' });
        }
    },

    /**
     * Fetch user details by email.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getUserByEmail(req, res) {
        const { email } = req.params;

        try {
            // Fetch user details
            const user = await User.findByEmail(email);
            if (!user) {
                logger.error(`User not found: ${email}`);
                return res.status(404).json({ error: 'User not found' });
            }
            logger.info(`Fetched user details: ${email}`);
            res.json({ user });
        } catch (err) {
            logger.error(`Error fetching user details: ${err.message}`);
            res.status(500).json({ error: 'Failed to fetch user details' });
        }
    },

    /**
     * Update user details.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async updateUser(req, res) {
        const { email } = req.params;
        const { newEmail, apiKey } = req.body;

        try {
            // Update user details
            const updated = await User.update(email, newEmail, apiKey);
            if (!updated) {
                logger.error(`User not found or not updated: ${email}`);
                return res.status(404).json({ error: 'User not found or not updated' });
            }
            logger.info(`User updated successfully: ${email}`);
            res.json({ success: true });
        } catch (err) {
            logger.error(`Error updating user: ${err.message}`);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    /**
     * Delete a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async deleteUser(req, res) {
        const { email } = req.params;

        try {
            // Delete the user
            const deleted = await User.delete(email);
            if (!deleted) {
                logger.error(`User not found or not deleted: ${email}`);
                return res.status(404).json({ error: 'User not found or not deleted' });
            }
            logger.info(`User deleted successfully: ${email}`);
            res.json({ success: true });
        } catch (err) {
            logger.error(`Error deleting user: ${err.message}`);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },
};

module.exports = UserController;




const getUser = async (req, res) => {
    const { id } = req.params;
    // Fetch user from the database
    res.json({ id, name: 'John Doe' });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // Update user in the database
    res.json({ id, name });
};

module.exports = { getUser, updateUser };