const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const deployToCloudflare = async (repoUrl) => {
    const response = await axios.post(
        'https://api.cloudflare.com/client/v4/pages/projects',
        { repo: { url: repoUrl } },
        { headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}` } }
    );
    return response.data;
};

module.exports = { deployToCloudflare };