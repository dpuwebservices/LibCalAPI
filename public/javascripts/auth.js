
const https = require('https');
const fetch = require('node-fetch');
const creds = require('../../creds.json');

function _auth() {
    creds_data = JSON.stringify(creds) 
    return fetch('https://libcal.depaul.edu/1.1/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': creds_data.length
        },
        body: creds_data
    }).then(response => response.json())
    .then(data => data.access_token)
}

async function auth_check(token) {
 return fetch(`https://libcal.depaul.edu/1.1/calendars`,
    {
        headers: 
        {
            'Authorization': `Bearer ${token}`
        }
    })
            .then(response => response.json())
            .then(async data =>
            {
                if ('error' in data) return await _auth();
                return token
            })
            .catch(err => console.error(err))
        }

module.exports = {
    auth_check
};
