var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

var dogRoutes = require('./routes/dogRoutes.js')(app);

var server = app.listen(3001, function() {
	console.log('Server running at http://localhost:3001');
});