const express = require('express');
const router = express.Router();
const path = require('path');

// Root route - Serve the frontend or a welcome message
router.get('/', (req, res) => {
    res.send('Welcome to AmatakCloud!');
});

// API routes
router.use('/api', require('./api'));

module.exports = router;