const Domain = require('../../database/models/Domain');
const logger = require('../../utils/logger'); // Custom logger for structured logging

const DomainController = {
    /**
     * Create a new domain.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createDomain(req, res) {
        const { domainName } = req.body;
        const userId = req.user.id;

        // Validate the domain name
        if (!domainName) {
            logger.error('Domain name is required.');
            return res.status(400).json({ error: 'Domain name is required.' });
        }

        try {
            // Create a new domain record
            const domainId = await Domain.create(userId, domainName);
            logger.info(`Domain created successfully: ${domainId}`);
            res.status(201).json({ domainId });
        } catch (err) {
            logger.error(`Error creating domain: ${err.message}`);
            res.status(500).json({ error: 'Failed to create domain' });
        }
    },

    /**
     * Fetch all domains for the authenticated user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getDomains(req, res) {
        const userId = req.user.id;

        try {
            // Fetch domains for the user
            const domains = await Domain.findByUserId(userId);
            logger.info(`Fetched ${domains.length} domains for user ${userId}`);
            res.json({ domains });
        } catch (err) {
            logger.error(`Error fetching domains: ${err.message}`);
            res.status(500).json({ error: 'Failed to fetch domains' });
        }
    },

    /**
     * Get details of a specific domain.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getDomainDetails(req, res) {
        const { domainId } = req.params;
        const userId = req.user.id;

        try {
            // Fetch domain details
            const domain = await Domain.findById(domainId, userId);
            if (!domain) {
                logger.error(`Domain not found: ${domainId}`);
                return res.status(404).json({ error: 'Domain not found' });
            }
            logger.info(`Fetched domain details: ${domainId}`);
            res.json({ domain });
        } catch (err) {
            logger.error(`Error fetching domain details: ${err.message}`);
            res.status(500).json({ error: 'Failed to fetch domain details' });
        }
    },

    /**
     * Update a domain.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async updateDomain(req, res) {
        const { domainId } = req.params;
        const { domainName } = req.body;
        const userId = req.user.id;

        // Validate the domain name
        if (!domainName) {
            logger.error('Domain name is required.');
            return res.status(400).json({ error: 'Domain name is required.' });
        }

        try {
            // Update the domain
            const updated = await Domain.update(domainId, userId, domainName);
            if (!updated) {
                logger.error(`Domain not found or not updated: ${domainId}`);
                return res.status(404).json({ error: 'Domain not found or not updated' });
            }
            logger.info(`Domain updated successfully: ${domainId}`);
            res.json({ success: true });
        } catch (err) {
            logger.error(`Error updating domain: ${err.message}`);
            res.status(500).json({ error: 'Failed to update domain' });
        }
    },

    /**
     * Delete a domain.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async deleteDomain(req, res) {
        const { domainId } = req.params;
        const userId = req.user.id;

        try {
            // Delete the domain
            const deleted = await Domain.delete(domainId, userId);
            if (!deleted) {
                logger.error(`Domain not found or not deleted: ${domainId}`);
                return res.status(404).json({ error: 'Domain not found or not deleted' });
            }
            logger.info(`Domain deleted successfully: ${domainId}`);
            res.json({ success: true });
        } catch (err) {
            logger.error(`Error deleting domain: ${err.message}`);
            res.status(500).json({ error: 'Failed to delete domain' });
        }
    },
};

module.exports = DomainController;



const getDomains = async (req, res) => {
    // Fetch domains from the database
    res.json([{ id: 1, name: 'example.com' }]);
};

const addDomain = async (req, res) => {
    const { name } = req.body;
    // Add domain to the database
    res.json({ id: 2, name });
};

const createDomain = async (req, res) => {
    const { domainName } = req.body;
    const userId = req.user.id;

    try {
        const domainId = await Domain.create(userId, domainName);
        res.json({ domainId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create domain' });
    }
};

module.exports = { getDomains, addDomain, createDomain };