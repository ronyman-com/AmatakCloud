const Domain = require('../../database/models/Domain');

const DomainController = {
    async createDomain(req, res) {
        const { domainName } = req.body;
        const userId = req.user.id;

        try {
            const domainId = await Domain.create(userId, domainName);
            res.json({ domainId });
        } catch (err) {
            res.status(500).json({ error: 'Failed to create domain' });
        }
    },
};

module.exports = DomainController;