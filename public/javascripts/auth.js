
const https = require('https');
const fetch = require('node-fetch');
const creds = require('../../creds.json');

function auth(req, res) {
    creds_data = JSON.stringify(creds) 
    fetch('https://libcal.depaul.edu/1.1/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': creds_data.length
        },
        body: creds_data
    }).then(response => response.json())
    .then(data => res.json(data))
}

module.exports = {
    auth
};