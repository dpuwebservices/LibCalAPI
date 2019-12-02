const fetch = require('node-fetch')
const authFunctions = require('./auth')
const dateFunctions = require('./dates')
var bearer_token

async function get_teach_learn_week(req,res) {
    if (!await authFunctions.auth_check(bearer_token))
    {
        console.log('invalid bearer token. changing bearer')
        bearer_token = await authFunctions.auth()
    }
    res.json(dateFunctions.get_next_seven_days())
}

module.exports = {
    get_teach_learn_week
}
