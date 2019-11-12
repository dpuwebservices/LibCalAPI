var express = require('express')
var router = express.Router();
var apiFunctions = require('../public/javascripts/apiFunctions')
var authFunctions = require('../public/javascripts/auth')
var groupFunctions = require('../public/javascripts/groupstudy')
var notGroupFunctions = require('../public/javascripts/everythingelse')

/* GET home page. */
router.get('/today', groupFunctions.group_reservations_today);
router.get('/auth', authFunctions.auth);
// router.get('/not_group', notGroupFunctions.get_category_ids);
router.get('/not_group', notGroupFunctions.all_other_reservations);
router.get('/', apiFunctions.baseFunc);
process.on('warning', e => console.warn(e.stack));

module.exports = router;
