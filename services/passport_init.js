var db = require('../models/dbhandler.js');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		done(null, user.uid);
	});

	passport.deserializeUser(function(uid, done) {
		db.queryWithCallback('SELECT * FROM user WHERE uid = ' + uid, function(err, rows) {
			console.log('deserializing user:', rows[0].username);
			done(err, rows[0]);
		})
	});

	passport.use('local-signin', new LocalStrategy({
			usernameField : 'username',
            passwordField : 'password',
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			// check in mongo if a user with username exists or not
			db.queryWithCallback('SELECT * FROM user WHERE username = "' + username + '"', 
				function(err, rows) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!rows.length){
						console.log('User Not Found with username ' + username);
						return done(null, false);                 
					}
					// User exists but wrong password, log the error 
					if (!isValidPassword(rows[0], password)){
						console.log('Invalid Password');
						return done(null, false); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					return done(null, rows[0]);
				}
			);
		}
	));

	passport.use('local-signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			// find a user in mongo with provided username
			db.queryWithCallback('SELECT * FROM user WHERE username = "' + username + '"', 
				function(err, rows) {
				// In case of any error, return using the done method

				if (err){
					console.log('Error in SignUp: ' + err);
					return done(err);
				}
				// already exists
				if (rows.length) {
					console.log('User already exists with username: ' + username);
					return done(null, false);
				} else {
					// if there is no user, create the user
					// create the user
                    var newUserMysql = {
                        username: username,
                        password: createHash(password)  // use the generateHash function in our user model
                    };

                    db.queryWithCallback('INSERT INTO user ( username, password ) values ("' + newUserMysql.username + '","' + newUserMysql.password +'")',
                    	function(err, rows){
                    		//console.log(rows);
                    		newUserMysql.uid = rows.insertId;
                    		console.log('Signup Successfully!');
                        	return done(null, newUserMysql);
                    	});


				}
			});
		})
	);
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};