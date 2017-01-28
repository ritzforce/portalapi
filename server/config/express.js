var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var cors = require('cors')
const environment = require('./environment');


module.exports = function (app) {

  const whitelistArr = getWhiteListArray(environment.cors.whitelist);

  app.disable('x-powered-by');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  
  app.set('trust proxy', 'loopback');

  let corsOptions = {
    origin: function(origin, callback) {
      const originIsWhitelisted = whitelistArr.indexOf(origin) !== -1;
      callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    }
  };

  app.use(cors(corsOptions));

};

// ================================================= //
// Get White Listed Url Domains
// ================================================= //
function getWhiteListArray(whiteList) {
  let whiteListArray = [];

  if (whiteList.indexOf(',') === -1) {
    whiteListArray = [ whiteList ];
  }
  else {
    whiteListArray = whiteList.split(',');
  }
  return whiteListArray;
}