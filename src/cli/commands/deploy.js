const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const deploy = async (repoUrl) => {
    const apiKey = process.env.CLOUDFLARE_API_KEY;
    try {
        const response = await axios.post(
            'https://api.cloudflare.com/client/v4/pages/projects',
            { repo: { url: repoUrl } },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        console.log('Deployment successful:', response.data);
    } catch (err) {
        console.error('Deployment failed:', err.response ? err.response.data : err.message);
    }
};

module.exports = deploy;