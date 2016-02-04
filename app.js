// Require modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect(require('./config/database').url);

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;

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

// MongoDB Models (Move this to a different place later)
var User = require('./models/User');

// Passport strategies
passport.use(require('./passport-strategies/local'));

// Load in main page
app.get('/', function (req, res) {
	res.render('index');
});

// Render partials for ui router
app.get('/p/:pageName', function (req, res) {
	var pageName = req.params.pageName;
	var file = '';

	// Replace + characters with slash characters
	for (var x = 0; x < pageName.length; x++){
	    var c = pageName.charAt(x);
	    
	    if (c == '+') {
			file += '/';
		} else {
			file += c;
		}
	}

	res.render('p/' + file);
});

// Socket IO Implementation
io.on('connection', function (socket) {
	console.log('New connection');
	socket.on('login', function (data, callback) {
		var email = data.email;
		var password = data.password;

		callback({
			// err: 'Wrong email or password',
			user: {
				name: 'Dennis Kievits'
			}
		});
	});
});

// Listen from incoming connections
http.listen(port, function () {
	var dateFormat = require('dateformat');
	var now = new Date();
	console.log('Server running on port ' + port + ' at ' + dateFormat(now, 'hh:MM:ss'));
});