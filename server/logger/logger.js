'use strict';

var winston = require('winston');
var path = require('path');
require('winston-loggly-bulk');

var logger = new winston.Logger({ exitOnError: false });

// ========================================= //
// Configure where logs will go
// ========================================= //
function configureTransports(config, pathToFolder) {
	let env = config.env;
	let arr = [];
	
	// Development Environment
	if (env === 'development') {
		arr.push(addDebugFileConfiguration(config, pathToFolder));
		arr.push(addErrorFileConfiguration(config, pathToFolder));
	}

  if (env === 'production') {
    // Add Loggly in Production only
    arr.push(addLoggly(config));
  }

  // Add Console, whether Production or Development
	arr.push(addConsole(config));
	
	return arr;
}

// =============================================== //
//  Configuration for Loggly Logging. Log the cloud
// ============================================= //
function addLoggly(config) {
	return new (winston.transports.Loggly)({
				inputToken: config.loggly.inputToken,
				subdomain: config.loggly.subdomain,
				tags: [config.loggly.tags],
				json: true,
			});
}

// ============================================== //
//  Console Loggy
// ============================================ //
function addConsole(config) {
	return new (winston.transports.Console)({
						colorize: true,
						timestamp: false,
						stringify: true,
					});
}

function addDebugFileConfiguration(config, pathToFolder) {
	return new (winston.transports.File)({
				name: 'debug-file',
				filename: path.join(pathToFolder, 'debug.log'),
				maxsize: 5242880,
				maxFiles: 3,
				json: false,
				prettyPrint: true,
				humanReadableUnhandledException : true,
				tailable: true,
				colorize: true,
				stringify: true,
				level: 'debug',
				timestamp: function(){
					return new Date().toISOString();	
				},
				formatter: function(options) {
        			// Return string will be passed to logger.
        			return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          				(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
     		    },
			});
}

function addErrorFileConfiguration(config, pathToFolder) {
	return new (winston.transports.File)({
				name: 'error-file',
				filename: path.join(pathToFolder, 'error.log'),
				maxsize: 5242880,
				maxFiles: 3,
				humanReadableUnhandledException : true,
				tailable: true,
				colorize: true,
				level: 'error'
			});
}

// =================================================== //
// Configure Logger for App
// ================================================== //
logger.configureForApp = function(config) {
	var pathToFolder = path.join(__dirname, './../logs');
	let transportAvenues = configureTransports(config, pathToFolder);

  logger.configure({
      level : config.log.logLevel,
      transports :  transportAvenues,
  });
}


module.exports = logger;
