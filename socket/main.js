module.exports = function (io) {
	return function (socket) {
		console.log('New connection');
		socket.on('login', require('./login')(io, socket));
		socket.on('logout', require('./logout')(io, socket));
	}
}