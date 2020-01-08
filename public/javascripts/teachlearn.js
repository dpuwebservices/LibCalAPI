const fetch = require('node-fetch')
const auth = require('./auth')
const dateFunctions = require('./dates')
const nick = require('./nicknames')
const teach_learn_cat_id = 3124
var bearer_token

//async foreach taken from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function get_teach_learn_week(req,res) {
    bearer_token = await auth.auth_check()
    let dates = dateFunctions.get_next_seven_days()
    var results = []
    const start = async () => {
      await asyncForEach(dates, async date => {
          let result = await nick.nicknames(bearer_token, teach_learn_cat_id, date)
          results.push(result[0].categories[0].spaces)
      });
        res.json(results)
    }
    start();
}

module.exports = {
    get_teach_learn_week
}
