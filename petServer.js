var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cats = require('./routes/petRoutes.js')(app);

var server = app.listen(3002, function() {
    console.log('Server running at http://localhost:3002/');
});