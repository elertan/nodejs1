var express = require('express');
var path = require('path');

var app = express();

// Serve static files
app.use(express.static('bower_components'));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
	res.render('index');
});

app.listen(port, function () {
	console.log('Server running on port ' + port);
});