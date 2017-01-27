var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var cors = require('cors')

module.exports = function (app) {

  app.disable('x-powered-by');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  
  app.set('trust proxy', 'loopback');

  app.use(cors());

};