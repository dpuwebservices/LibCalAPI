const auth = require('./auth')
const dates = require('./dates')
const nick = require('./nicknames')
const fetch = require('node-fetch')
const group_study_room_cat_id = 3120
var bearer_token


async function get_group_reservations_today(req, res) 
{
    var today = dates.get_today()
    bearer_token = await auth.auth_check()
    let results = await nick.nicknames(bearer_token, group_study_room_cat_id, dates.get_useable_format(today))
    res.json(results[0].categories[0].spaces)
}

module.exports = {
    get_group_reservations_today,
}
