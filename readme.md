# LibCalApi
This is an expressjs application written by Collin De Kalb to display room reservation information from the LibCal system.
    
## Requirements
    - Nodejs
    - npm
    
## Setup
In order to run the application you must have a json file called *creds.json* in the root of the project. The file should look like this:
```json
{
    "client_id":"X",
    "client_secret":"Y",
    "grant_type":"client_credentials"
}
 ```
## Starting the project
1. Navigate to the root directory and type `npm install` to install dependencies.
2. Type `npm start` to start the server
3. Make GET requests to the endpoints to receive the formatted html. By default the server is started on port 3000 of localhost.

## Available Endpoints
- `/api/today` This gives you the reservations for the group study rooms today
- `/api/not_group` This gives you the reservations for all rooms that aren't the group study rooms today
- `/api/teach` This gives the reservations of teaching and learning rooms for the next seven days

## Guide to editing
- Endpoints are defined in the file `/routes/api.js`
- Html is written using the [pug template engine](https://pugjs.org/api/getting-started.html) and can be found in `/views`
    - edit `layout.pug` for base html edits like changing the head and edit `index.pug` for tweaking the room listings
- JS functions are found in `/public/javascripts/` 
    - `groupstudy.js` is responsible for groupstudy rooms
    - `everythingelse.js` is responsible for everything except groupstudy rooms
    - `teachlearn.js` is responsible for teaching and learning rooms
    - `date.js` is responsible for date functions
    - `nicknames.js` is responsible for making the nickname get requests to the api
    - `auth.js` is responsible for the auth functions and supplying the bearer token
    - To edit what data is passed to `index.pug` check for the `res.render` call in the first three js files.

