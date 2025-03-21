const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const logs = async (deploymentId) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/deployments/${deploymentId}/logs`,
            { headers: { 'x-api-key': process.env.CLOUDFLARE_API_KEY } }
        );
        console.log('Logs:', response.data.logs);
    } catch (err) {
        console.error('Error fetching logs:', err.response ? err.response.data : err.message);
    }
};

module.exports = logs;