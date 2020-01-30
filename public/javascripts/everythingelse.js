const fetch = require('node-fetch')
const nick = require('./nicknames')
const dateFunctions = require('./dates')
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
    let bearer_token = await auth.auth_check()
    let categories = await get_category_ids()
    var results = []
      await a.async_for_each(categories, async date => {
          let result = await nick.nicknames(bearer_token, date, dateFunctions.get_today())
          results.push(result[0].categories[0].spaces)
      });
    res.json(results)
}

module.exports = {
    get_everything_else
}
