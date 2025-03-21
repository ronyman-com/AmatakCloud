const { User } = require('../../database/models');

const authenticate = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ error: 'API key required' });

    const user = await User.findByApiKey(apiKey);
    if (!user) return res.status(401).json({ error: 'Invalid API key' });

    req.user = user;
    next();
};

module.exports = authenticate;