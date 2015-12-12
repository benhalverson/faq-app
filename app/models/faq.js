'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Faq', new Schema({
  title: String,
  body: String,
  author: String
}));
