module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.js'],
    setupFiles: ['dotenv/config'], // Load environment variables using dotenv
};


