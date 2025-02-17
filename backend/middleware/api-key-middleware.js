const apiKeys = new Set(['your-api-key1', 'your-api-key2']); // Add your API keys here

const validateApiKey = (req, res, next) => {
    const apiKey = req.header('X-API-Key');

    if (!apiKey || !apiKeys.has(apiKey)) {
        return res.status(403).json({ message: 'Forbidden - Invalid API Key' });
    }

    next();
}

module.exports = validateApiKey;


// const axios = require('axios');

// const apiKey = 'your-api-key';
// const apiUrl = 'http://your-api-url/getproduct';

// axios.get(apiUrl, { headers: { 'X-API-Key': apiKey } })
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error.response.data);
//     });
