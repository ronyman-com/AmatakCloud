const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./api/routes');
const dbErrorHandler = require('./api/middleware/dbErrorHandler');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.use('/api', routes);

// Root route - Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Database error handler
app.use(dbErrorHandler);

// Global error handler
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;