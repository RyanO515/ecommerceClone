var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');


//serialize and deserialize
passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

//middleware

passport.use('local-login', new localStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function (req, email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, req.flash('loginMessage', 'No user has been found'));
		}

		if (!user.authenticate(password)) {
			return done(null, false, req.flash('loginMessage', 'Oops!  Wrong password!'));
		}

		return done(null, user);
	});
}));

//custom function to validate

exports.isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated()) {
		next();
	}
	res.redirect('/login');
}





