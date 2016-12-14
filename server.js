#!/usr/bin/env node

var express    = require('express');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var path       = require('path');
var db         = require('./db');
var controller = require('./controller');
var app        = express();

// connect to database:

db.connect('mongodb://localhost/autocomplete', function(err) {
  if (err) {
    console.log('unable to connect to mongodb');
    process.exit(1);
  } else {
    console.log('connected to mongodb');
  }
});

// configure server:

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'ui')));

app.get('/autocomplete/:partial', controller.handleRequest);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(res.locals);
});

// start server:

var port = 3005;
app.listen(port, function() {
  console.log("listening on port "+ port);
});
