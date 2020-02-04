var express = require('express')
var router = express.Router();
//var apiFunctions = require('../public/javascripts/apiFunctions')
var authFunctions = require('../public/javascripts/auth')
var groupFunctions = require('../public/javascripts/groupstudy')
var notGroupFunctions = require('../public/javascripts/everythingelse')
var teachLearnFunctions = require('../public/javascripts/teachlearn')

/* GET home page. */
//router.get('/auth', authFunctions.auth);

router.get('/today', groupFunctions.get_group_reservations_today);
router.get('/not_group', notGroupFunctions.get_everything_else);
router.get('/teach', teachLearnFunctions.get_teach_learn_week);

process.on('warning', e => console.warn(e.stack));

module.exports = router;
