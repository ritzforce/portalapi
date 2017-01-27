/**
 * Routes for express app
 */
var express = require('express');
var _ = require('lodash');
var path = require('path');

module.exports = function(app) {
  app.use('/api/sobject' , require('../api/sobject'));
  app.use('/auth', require('../auth'));
};
