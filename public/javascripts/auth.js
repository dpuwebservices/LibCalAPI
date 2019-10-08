
const https = require('https');
const creds = require('../../creds.json');

function auth(req, res) {
    const data = JSON.stringify({
        'client_id': creds.client_id,
        'client_secret': creds.client_secret,
        'grant_type': creds.grant_type
    })
    const options = {
    hostname: 'libcal.depaul.edu',
    path: '/1.1/oauth/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
        }
    }

    const requ = https.request(options, resp => {
    console.log(`statusCode: ${resp.statusCode}`)

    resp.on('data', d => {
        process.stdout.write(d);
        let to = d.toString()
        to = JSON.parse(to)
        res.json(to)
    })
    })

    requ.on('error', error => {
    console.error(error)
    })

    requ.write(data)
    requ.end()
}

module.exports = {
    auth
};