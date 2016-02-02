var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve static files
app.use(express.static('bower_components'));
app.use(express.static('public'));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
	res.render('index');
});

io.on('connection', function (socket) {
	console.log('New connection');
});

http.listen(port, function () {
	console.log('Server running on port ' + port);
});