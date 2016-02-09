module.exports = function (io, socket) {
	return function (data, callback) {
		// Block request from already logged in users
		if (socket.handshake.session.user == null) {
			callback({
				err: 'There is no one logged in'
			});
		} else {
			delete socket.handshake.session.user;
			socket.emit('loggedOut', {});
		}
	}
}