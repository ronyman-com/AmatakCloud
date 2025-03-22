const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const logDir = path.resolve(__dirname, '../../logs');
const logFile = path.join(logDir, 'amatakcloud.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = {
    log: (message) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        console.log(logMessage);
        fs.appendFileSync(logFile, logMessage);
    },
    error: (message) => {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ERROR: ${message}\n`;
        console.error(errorMessage);
        fs.appendFileSync(logFile, errorMessage);
    },
    info: (message) => {
        const timestamp = new Date().toISOString();
        const infoMessage = `[${timestamp}] INFO: ${message}\n`;
        console.info(infoMessage);
        fs.appendFileSync(logFile, infoMessage);
    },
};

module.exports = logger;