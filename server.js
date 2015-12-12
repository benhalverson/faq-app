'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var app = express();
var config = require('./config');
var Faq = require('./app/models/faq');

var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('Supersecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// routes

app.get('/', function(req, res) {
  res.send('The api is working');
});

app.listen(port);
console.log('Listening on port' + port);
