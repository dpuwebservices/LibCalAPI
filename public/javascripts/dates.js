const week_ms = 604800000
const day_s = 86400000

function get_today()
{
    return new Date()
}
function get_week_from_today()
{
    return new Date(Date.now() + week_ms)

}
function get_next_seven_days()
{
    let dates = []
    day_in_loop = Date.now()
    for (var i = 0; i < 7; i++)
    {
        dates.push(get_useable_format(new Date(day_in_loop)))
        day_in_loop += day_s
    }
    return dates 
}
function get_useable_format(date)
{
   let year = date.getUTCFullYear() 
    //utcmonth starts at 0 so I add 1
   let month = date.getUTCMonth() + 1
   let day = date.getUTCDate() 
    if (day.toString().length < 2) day = '0'.concat(day.toString())
   return `${year}-${month}-${day}`
}

module.exports =
{
    get_today,
    get_useable_format,
    get_week_from_today,
    get_next_seven_days
}
