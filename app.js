var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
	res.end('Hello world!');
});

app.listen(port, function () {
	console.log('Server running on port ' + port);
});