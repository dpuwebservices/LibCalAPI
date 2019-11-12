const fetch = require('node-fetch')
const booking = require('./groupstudy')
const jtr_id = 1432
const bearer_token = '65365296ef9a4dd183d3f090ce6c5140975f260f'
let id_promises = []
let room_promises = []

async function get_category_rooms(category_id)
{
    return fetch(`https://libcal.depaul.edu/1.1/space/category/${category_id}`,
    {
        headers: 
        {
            'Authorization': `Bearer ${bearer_token}`
        }
    }).then(response => response.json())
    .then(data => data.map(category => category.items))
    .catch(err => console.error(err))
}

async function get_category_ids() {
    return fetch(`https://libcal.depaul.edu/1.1/space/categories/${jtr_id}`,
    {
        headers: 
        {
            'Authorization': `Bearer ${bearer_token}`
        }
    })
    .then(response => response.json())
    .then(data => 
        {
	    categories = data[0]["categories"].filter(category => category.name !== "Group Study Rooms")
            categories.forEach((category_item) => 
            {
                id_promises.push(new Promise((resolve, reject) => 
                {
                    resolve(get_category_rooms(category_item.cid))
                }))
            })
        })
}


async function get_room_bookings(room_id) {
    return fetch(`https://libcal.depaul.edu/1.1/space/bookings?eid=${room_id}`,
    {
        headers: 
        {
            'Authorization': `Bearer ${bearer_token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
}
async function all_other_reservations(req,res)
{
    await get_category_ids()
    let rooms = await Promise.all(id_promises)
    .then(responses => 
        {
            let room_ids = responses.flat(2)
            room_ids.forEach(room_id => 
            {
                room_promises.push(new Promise((resolve, reject) =>
                    {
                        resolve(get_room_bookings(room_id))
                    }))
            })
        })
	.catch(error => console.error(error))
    let room_bookings = await Promise.all(room_promises).
        then(responses => res.json(responses)).
        catch(error => console.error(error))
}

module.exports = {
    all_other_reservations
}
