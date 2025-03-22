const express = require('express');
const router = express.Router();

// Import controllers
const { deploy } = require('../controllers/DeploymentController');
const { getUser, updateUser } = require('../controllers/UserController');
const { getDomains, addDomain, createDomain } = require('../controllers/DomainController');
const { getBillingInfo } = require('../controllers/BillingController');

// Deployment routes
router.post('/deploy', deploy); // Deploy to Cloudflare

// User routes
router.get('/users/:id', getUser); // Get user by ID
router.put('/users/:id', updateUser); // Update user by ID

// Domain routes
router.get('/domains', getDomains); // Get all domains
router.post('/domains', addDomain); // Add a new domain
router.post('/domains', createDomain); // Ensure `createDomain` is defined and imported correctly

// Billing routes
router.get('/billing', getBillingInfo); // Get billing information


// Define your API routes
router.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});
// Example route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});
// Export the router
module.exports = router;






// Example route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});