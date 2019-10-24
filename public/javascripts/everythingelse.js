const fetch = require('node-fetch')
const jtr_id = 1432
const bearer_token = '5709e9c157df7e15a6eae3313dcf16f6d80b6146'
const api_key = ''
let promises = []

async function get_category_rooms(category_id)
{
    return fetch(`https://libcal.depaul.edu/1.1/space/category/${category_id}`,
    {
        headers: 
        {
            'Authorization': `Bearer ${bearer_token}`
        }
    }).then(response => response.json())
    .then(data => data)
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
            let categories = data[0]["categories"].filter(category => category.name !== "Group Study Rooms")
            categories.forEach((category_item) => 
            {
                promises.push(new Promise((resolve, reject) => 
                {
                    resolve(get_category_rooms(category_item.cid))
                }))
            })
        })
}

async function all_other_reservations(req,res)
{
    await get_category_ids()
    await Promise.all(promises)
    .then(responses => res.json(responses))
    .catch(res.json({"message":"it fucked up"}))
    .then(res.json({"message":"we somewhere else"}))
}

module.exports = {
    all_other_reservations
}