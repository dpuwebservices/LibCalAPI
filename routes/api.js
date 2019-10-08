var express = require('express')
var router = express.Router();
var tests = require('../public/javascripts/test')

/* GET home page. */
router.get('/', tests.testFunc);

module.exports = router;
