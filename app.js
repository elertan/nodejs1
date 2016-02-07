// Require modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect(require('./config/database').url);

var db = mongoose.connection;
db.on('error', function () {
	console.error('Error: Are you sure mongo is running?');
	process.exit(500);
});

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');

// Passport strategies
passport.use(require('./passport-strategies/local'));

var port = process.env.PORT || 1337;

// Serve static files
app.use(express.static('bower_components'));
app.use(express.static('public'));

// modules
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ 
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

// Load in main page
app.get('/', function (req, res) {
	res.render('index');
});

// Render partials for ui router
app.get('/p/:pageName', function (req, res) {
	var pageName = req.params.pageName;
	var file = '';

	// Replace + characters with slash characters
	for (var x = 0; x < pageName.length; x++) {
	    var c = pageName.charAt(x);
	    
	    if (c == '+') {
			file += '/';
		} else {
			file += c;
		}
	}

	fs.lstat('./views/p/' + file, function (err, stats) {
		if (!err) {
			// File exists
			res.render('p/' + file);
		} else {
			res.render('/p/errors/404');
		}
	});
});

// Socket IO Implementation
io.on('connection', require('./socket/main')(io));

// Listen from incoming connections
http.listen(port, function () {
	var dateFormat = require('dateformat');
	var now = new Date();
	console.log('Server running on port ' + port + ' at ' + dateFormat(now, 'hh:MM:ss'));
});