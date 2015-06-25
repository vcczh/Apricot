var express = require('express');

var db = require('../models/dbhandler');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* Test Db connection with sample query */
router.get('/testDB', function (req, res) {
	db.test(req, res);
})

module.exports = router;
