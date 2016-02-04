var PassportLocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

var strategy = new PassportLocalStrategy(function (username, password, done) {
	User.findOne({
		username: username
	}, function (err, user) {
		if (err) {
			// error occured
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message: 'Incorrect username.'
			});
		}
		if (!user.validPassword(password)) {
			return done(null, false, {
				message: 'Incorrect password.'
			});
		}
		return done(null, user);
	});
});

module.exports = strategy;