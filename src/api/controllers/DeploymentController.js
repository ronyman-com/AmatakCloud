const Deployment = require('../../database/models/Deployment');
const logger = require('../../utils/logger'); // Custom logger for structured logging

const DeploymentController = {
    /**
     * Create a new deployment.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createDeployment(req, res) {
        const { repoUrl } = req.body;
        const userId = req.user.id;

        // Validate the repository URL
        if (!repoUrl) {
            logger.error('Repository URL is required.');
            return res.status(400).json({ error: 'Repository URL is required.' });
        }

        try {
            // Create a new deployment record
            const deploymentId = await Deployment.create(userId, repoUrl, 'pending', 'Build started...');
            logger.info(`Deployment created successfully: ${deploymentId}`);
            res.status(201).json({ deploymentId });
        } catch (err) {
            logger.error(`Error creating deployment: ${err.message}`);
            res.status(500).json({ error: 'Failed to create deployment' });
        }
    },

    /**
     * Fetch all deployments for the authenticated user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getDeployments(req, res) {
        const userId = req.user.id;

        try {
            // Fetch deployments for the user
            const deployments = await Deployment.findByUserId(userId);
            logger.info(`Fetched ${deployments.length} deployments for user ${userId}`);
            res.json({ deployments });
        } catch (err) {
            logger.error(`Error fetching deployments: ${err.message}`);
            res.status(500).json({ error: 'Failed to fetch deployments' });
        }
    },

    /**
     * Get details of a specific deployment.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getDeploymentDetails(req, res) {
        const { deploymentId } = req.params;
        const userId = req.user.id;

        try {
            // Fetch deployment details
            const deployment = await Deployment.findById(deploymentId, userId);
            if (!deployment) {
                logger.error(`Deployment not found: ${deploymentId}`);
                return res.status(404).json({ error: 'Deployment not found' });
            }
            logger.info(`Fetched deployment details: ${deploymentId}`);
            res.json({ deployment });
        } catch (err) {
            logger.error(`Error fetching deployment details: ${err.message}`);
            res.status(500).json({ error: 'Failed to fetch deployment details' });
        }
    },

    /**
     * Update the status of a deployment.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async updateDeploymentStatus(req, res) {
        const { deploymentId } = req.params;
        const { status, message } = req.body;
        const userId = req.user.id;

        try {
            // Update deployment status
            const updated = await Deployment.updateStatus(deploymentId, userId, status, message);
            if (!updated) {
                logger.error(`Deployment not found or not updated: ${deploymentId}`);
                return res.status(404).json({ error: 'Deployment not found or not updated' });
            }
            logger.info(`Deployment status updated: ${deploymentId}`);
            res.json({ success: true });
        } catch (err) {
            logger.error(`Error updating deployment status: ${err.message}`);
            res.status(500).json({ error: 'Failed to update deployment status' });
        }
    },
};

module.exports = DeploymentController;




const { deployToCloudflare } = require('../../services/cloudflare');

const deploy = async (req, res) => {
    const { repoUrl } = req.body;

    try {
        const result = await deployToCloudflare(repoUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to deploy to Cloudflare' });
    }
};

module.exports = { deploy };