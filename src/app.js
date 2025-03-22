const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet'); // Security middleware
const rateLimit = require('express-rate-limit'); // Rate limiting
const compression = require('compression'); // Response compression
const cors = require('cors'); // CORS middleware
const routes = require('./api/routes'); // API routes
const logger = require('./utils/logger'); // Custom logger
const dbErrorHandler = require('./api/middleware/dbErrorHandler'); // Database error handler

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting (to prevent abuse)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Compress responses (improves performance)
app.use(compression());

// Enable CORS (Cross-Origin Resource Sharing)
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Allow specific origin
    optionsSuccessStatus: 200, // Legacy browser support
};
app.use(cors(corsOptions));

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies and authentication headers
}));




const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './database/amatakcloud.db', // Path to your SQLite database file
    },
    useNullAsDefault: true,
});

// Test the database connection
knex.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });


// Parse JSON request bodies
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/dist/'), {
    maxAge: '1y', // Cache static assets for 1 year
}));

// API routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Root route - Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Catch-all route to serve the frontend (for single-page applications)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
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