const fetch = require('node-fetch')

async function nicknames(bearer_token, category, date) {
    return fetch(`https://libcal.depaul.edu/1.1/space/nickname/${category}?date=${date}`,
    {
                headers: 
                {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err))
    }

module.exports =
{
   nicknames 
}
