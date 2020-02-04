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
    let t1 = results[0].categories[0].spaces
    t1.forEach(space => space.bookings.forEach(event => {
        event.start = new Date(event.start).toLocaleTimeString()
        event.end = new Date(event.end).toLocaleTimeString()
    }))
    res.render('index', {'t':t1,'title':'Group Study Rooms Today'})
}

module.exports = {
    get_group_reservations_today,
}
