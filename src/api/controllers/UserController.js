const User = require('../../database/models/User');
const { generateApiKey } = require('../utils/apiKeyGenerator');

const UserController = {
    async generateApiKey(req, res) {
        const { email } = req.body;
        const apiKey = generateApiKey();

        try {
            await User.createTable();
            // Save user and API key to the database
            res.json({ apiKey });
        } catch (err) {
            res.status(500).json({ error: 'Failed to generate API key' });
        }
    },
};

module.exports = UserController;