var express = require('express');

var db = require('../models/dbhandler');

var router = express.Router();

//Used for routes that must be authenticated.
isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	//if(req.method === "GET"){
	//	return next();
	//}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the signin page
	res.redirect('/signin');
};



module.exports = router;
