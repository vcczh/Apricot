var express = require('express');
var router = express.Router();
var db = require('../models/dbhandler');

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		res.render('index', { title: 'Signed in Successfully' });;
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	//log in
	router.route('/signin')
		//Get signin page
		.get(function(req, res) {
			res.render('index', { title: 'Express' });
			console.log("TODO: SignIn Page!");
		})
		//Sign in
		.post(passport.authenticate('local-signin', {
			successRedirect: '/auth/success',
			failureRedirect: '/auth/failure'
		}));

	//sign up
	router.route('/signup')
		//Get the signup page
		.get(function(req, res) {
			res.render('index', { title: 'Express' });
			console.log("TODO: SignUp Page!");
		})
		//Signup
		.post(passport.authenticate('local-signup', {
			successRedirect: '/auth/success',
			failureRedirect: '/auth/failure'
		}));

	//log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};