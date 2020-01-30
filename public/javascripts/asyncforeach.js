//async foreach taken from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function async_for_each(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
module.exports = {
   async_for_each 
}
