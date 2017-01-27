/*
 Configure things that needs to initialized eg logger, sfservice etc
 */
module.exports = function(app) {
  const environment = require('./environment');

  // Initialize the Logger Service
  let logger = require('./../logger/logger');
  logger.configureForApp(environment);


  // Initialize the Salesforce Service
  let sfService = require('./../api/sfService');
  sfService.init(environment);
}
