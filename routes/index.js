var express = require('express');

var db = require('../models/dbhandler');

var router = express.Router();


/* GET home page. */
router.route('/').get(function (req, res) {
	res.render('index', {});
});

/* Test Db connection with sample query */
// router.get('/testDB', function (req, res) {
// 	db.test(req, res);
// });

module.exports = router;
