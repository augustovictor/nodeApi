var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats'); // 'mongodb' = protocol; IMPORTANT: DO NOT INCLUDE PORT!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./routes/catRoutes.js')(app);

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
});