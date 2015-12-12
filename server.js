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

var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res){
  res.json({ message: 'Some message goes here' });
});

apiRoutes.get('/list', function(req, res) {
  Faq.find({}, function(err, faqs) {
    res.json(faqs);
  });
});

// create a faq
apiRoutes.route('/create')
  .post(function(req, res){
    var faq = new Faq();
    faq.title = req.body.title;
    faq.body = req.body.body;
    faq.author = req.body.author;

    faq.save(function(err){
      if(err) {
        console.error('Oh noes!', err);
        res.send(err);
      } else {
        res.json(faq);
      }
    });
  });

// edit a faq
apiRoutes.route('/edit/:faq_id')
  .get(function(req, res){
    Faq.findById(req.params.faq_id, function(err, faq){
      if(err) {
        res.send(err);
      } else {
        res.json(faq);
      }
    })
  })
  .put(function(req, res){
    Faq.findById(req.params.faq_id, function(err, faq){
      if(err) {
        res.send(err)
      } else {
        faq.title = req.body.title;
        faq.body = req.body.body;
        faq.save(function(err){
          if(err) {
            res.send(err)
          } else {
            res.json({message: 'FAQ updated' });
          }
        });
      }
    });
  })
  .delete(function(req, res){
    Faq.remove({_id: req.params.faq_id}, function(err, faq){
      if(err) {
        res.send(err)
      } else {
        res.json({message: 'FAQ deleted' });
      }
    });
  });

app.use('/api', apiRoutes);




app.listen(port);
console.log('Listening on port: ' + port);
