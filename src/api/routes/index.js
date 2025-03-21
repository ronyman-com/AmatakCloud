const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/UserController');
const DeploymentController = require('../controllers/DeploymentController');
const DomainController = require('../controllers/DomainController');
const authenticate = require('../middleware/auth');

// Root route - Serve the frontend or a welcome message
router.get('/', (req, res) => {
    // If serving a frontend, use this:
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));

    // If not serving a frontend, use this:
    // res.send('Welcome to AmatakCloud!');
});

// Public routes (no authentication required)
router.post('/generate-key', UserController.generateApiKey);

// Apply authentication middleware to all routes below this line
router.use(authenticate);

// Protected routes (authentication required)
router.post('/deploy', DeploymentController.createDeployment);
router.get('/deployments', DeploymentController.getDeployments);
router.post('/domains', DomainController.createDomain);

// API routes (if using a separate router file)
router.use('/api', require('./api'));

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;