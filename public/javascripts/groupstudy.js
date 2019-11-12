const group_study_room_cat_id = 3120
const bearer_token = '5da7c6d9afab7ecda7517edf747f4f08b02bc3de'
const fetch = require('node-fetch')
let promises = []

async function get_bookings(room_id) {
        return fetch(`https://libcal.depaul.edu/1.1/space/bookings?eid=${room_id}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
}

async function get_room_ids() {
    return fetch(`https://libcal.depaul.edu/1.1/space/category/${group_study_room_cat_id}`,
    {
                headers: 
                {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            .then(response => response.json())
            .then(data =>
                {
                room_ids = data[0]['items']
                room_ids.forEach((room_id) => 
                {
                    promises.push(new Promise((resolve, reject) => 
                    {
                        resolve(get_bookings(room_id))
                    }))
                })
            })
            .catch(err => console.error(err))
}

async function group_reservations_today(req, res) 
{
    await get_room_ids()
    await Promise.all(promises).then((responses => 
    {
        console.log(`These are the responses ${responses}`)
        res.json(responses)
    })).catch((responses => 
        {
            console.log(`This fucked up, but here are the responses: ${responses}`)
        }))}

module.exports = {
    group_reservations_today,
    get_bookings
}