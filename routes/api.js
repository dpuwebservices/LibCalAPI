var express = require('express')
var router = express.Router();
var apiFunctions = require('../public/javascripts/apiFunctions')
var authFunctions = require('../public/javascripts/auth')

/* GET home page. */
router.get('/auth', authFunctions.auth);
router.get('/', apiFunctions.baseFunc);

module.exports = router;
