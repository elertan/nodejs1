var User = require('../models/User');

module.exports = function (io, socket) {
	return function (data, callback) {

		// Block request from already logged in users
		if (socket.handshake.session.user != null) {
			callback({
				err: 'You are already logged in'
			});
		}

		var email = data.email;
		var password = data.password;

		User.find({ 'local.email': email }, function (err, users) {

			if (users.length != 1) {
				callback({
					err: 'This email is not registered on our site'
				});
				return;
			}

			var user = users[0];
			if (!user.validPassword(password)) {
				callback({
					err: 'Password is incorrect'
				});
				return;
			}

			socket.handshake.session.user = user.local;

			callback({
				user: user.local
			});

		});
	}
}