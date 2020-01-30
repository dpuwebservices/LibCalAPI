const fetch = require('node-fetch')
const auth = require('./auth')
const a = require('./asyncforeach')
const dateFunctions = require('./dates')
const nick = require('./nicknames')
const teach_learn_cat_id = 3124
var bearer_token

async function get_teach_learn_week(req,res) {
    bearer_token = await auth.auth_check()
    let dates = dateFunctions.get_next_seven_days()
    var results = []
      await a.async_for_each(dates, async date => {
          let result = await nick.nicknames(bearer_token, teach_learn_cat_id, date)
          results.push(result[0].categories[0].spaces)
      });
        res.json(results)
}

module.exports = {
    get_teach_learn_week
}
