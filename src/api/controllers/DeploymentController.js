const Deployment = require('../../database/models/Deployment');

const DeploymentController = {
    async createDeployment(req, res) {
        const { repoUrl } = req.body;
        const userId = req.user.id;

        try {
            const deploymentId = await Deployment.create(userId, repoUrl, 'pending', 'Build started...');
            res.json({ deploymentId });
        } catch (err) {
            console.error('Error creating deployment:', err.message);
            res.status(500).json({ error: 'Failed to create deployment' });
        }
    },

    async getDeployments(req, res) {
        const userId = req.user.id;

        try {
            const deployments = await Deployment.findByUserId(userId);
            res.json({ deployments });
        } catch (err) {
            console.error('Error fetching deployments:', err.message);
            res.status(500).json({ error: 'Failed to fetch deployments' });
        }
    },
};

module.exports = DeploymentController;