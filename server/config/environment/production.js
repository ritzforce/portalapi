'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
    
  loggly: {
     inputToken: process.env.LOGGLY_INPUT_TOKEN,
     subdomain: process.env.LOGGLY_SUB_DOMAIN,
     tags: process.env.LOGGLY_TAGS 
  },

  salesforce: {
    username: process.env.SFDC_USERNAME ,
    password: process.env.SFDC_PASSWORD,
    token: process.env.SFDC_TOKEN ,
    endPoint: process.env.SFDC_ENDPOINT
  }
  
  log: {
    logLevel : process.env.LOG_LEVEL || 'debug' 
  },
};