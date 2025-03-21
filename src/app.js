const express = require('express');
const dotenv = require('dotenv');
const routes = require('./api/routes');
const dbErrorHandler = require('./api/middleware/dbErrorHandler');
const logger = require('./utils/logger');



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.use('/api', routes);

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(express.json());
app.use('/api', routes);

module.exports = app;

app.use(dbErrorHandler);

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        logger.log(`Server running on http://localhost:${PORT}`);
    });
}


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});