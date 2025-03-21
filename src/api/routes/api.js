const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const DeploymentController = require('../controllers/DeploymentController');
const DomainController = require('../controllers/DomainController');
const authenticate = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/generate-key', UserController.generateApiKey);

// Apply authentication middleware to all routes below this line
router.use(authenticate);

// Protected routes (authentication required)
router.post('/deploy', DeploymentController.createDeployment);
router.get('/deployments', DeploymentController.getDeployments);
router.post('/domains', DomainController.createDomain);

module.exports = router;