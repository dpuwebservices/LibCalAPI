var express = require('express')
var router = express.Router();
var apiFunctions = require('../public/javascripts/apiFunctions')
var authFunctions = require('../public/javascripts/auth')
var groupFunctions = require('../public/javascripts/groupstudy')

/* GET home page. */
router.get('/today', groupFunctions.group_reservations_today);
router.get('/auth', authFunctions.auth);
router.get('/', apiFunctions.baseFunc);
process.on('warning', e => console.warn(e.stack));

module.exports = router;
