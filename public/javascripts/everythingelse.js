const fetch = require('node-fetch')
const nick = require('./nicknames')
const dates = require('./dates')
const a = require('./asyncforeach')
const auth = require('./auth')
const jtr_id = 1432


async function get_category_ids(bearer_token) {
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
            return categories.map(item => item.cid)
        })
}

async function get_everything_else(req,res)
{
    let today = dates.get_today()
    let bearer_token = await auth.auth_check()
    let categories = await get_category_ids(bearer_token)
    var results = []
      await a.async_for_each(categories, async category => {
          let result = await nick.nicknames(bearer_token, category, dates.get_useable_format(today))
          results.push(result[0].categories[0].spaces)
      });
    let complete = results.flat()
    complete.forEach(space => space.bookings.forEach(event => {
                event.start = new Date(event.start).toLocaleTimeString()
                event.end = new Date(event.end).toLocaleTimeString()
            }))
    //res.json(test)
    res.render('index', {'t':complete,'title':'Everything Else Today'})
}

module.exports = {
    get_everything_else
}
