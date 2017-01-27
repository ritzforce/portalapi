'use strict';
let jsforce = require('jsforce');
let EventEmitter = require('events');
let logger = require('./../logger/logger');


/****************************************************************************
 All Sf Related transactions will go from here
 Doesnot do any validations on input, everything must be validated prior to this point
 *****************************************************************************/
class SfService extends EventEmitter {

  constructor(config) {
    super();
    this._config = config;
  }

  // ====================================================================== //
  // Custom Portal Login User Implementation
  // ====================================================================== //
  loginPortalUser(username, callback) {
    logger.debug('Entering SfService.loginPortalUser', username);
    this.query(`SELECT id,name,first_name__c,last_name__c,email__c,active__c,password__c,salt__c FROM Portal_User__c
                    WHERE username__c = '${username}'`, callback);
  }

  update(sObjectName, body, callback) {
    this.getConnection().then(conn => {
      conn.sobject(sObjectName).update(body, function (err, result) {
        callback(err, result);
      });
    });
  }

  delete(sObjectName, recordId, callback) {
    this.getConnection().then(conn => {
      conn.sobject(sObjectName).destroy(recordId, function (err, result) {
        callback(err, result);
      });
    })
  }

  create(sObjectName, body, callback) {
    this.getConnection().then(conn => {
      conn.sobject(sObjectName).create(body, function (err, result) {
        callback(err, result);
      });
    });
  }

  query(qry, callback) {

    logger.debug('Entering SfService.query', qry);
    this.getConnection().then(conn => {
      conn.query(qry, function (err, result) {
        if (err) {
          logger.error("Error in SfService.query", err);
          callback(err, null);
          return;
        }
        logger.debug('SfService.query results', result);
        callback(err, result.records);
      });
    });
  }

  getConnection() {
    return new Promise((resolve, reject) => {
      // If the connection is available, means user is already logged in, and we
      // are returning a promise straightaway
      if (this._conn) {
        resolve(this._conn);
        return;
      }
      this.on('connected', () => {
        resolve(this._conn);
      });
    });
  }

  // ================================================================= //
  // Create connection to Salesforce End Point using the connection
  // ================================================================ //
  createConnection() {

    logger.debug('Enter SfService.createConnection');

    let jsConnection = new jsforce.Connection({
      loginUrl: this._config.salesforce.endPoint,
    });
    let password = this._config.salesforce.password;
    const token = this._config.salesforce.token;
    if (token) {
      password = `${password}${token}`;
    }

	logger.debug('*****Entering into Salesforce Login****', this._config.salesforce.username);
	
    jsConnection.login(this._config.salesforce.username, password, (err, res) => {
      if (err) {
        logger.error('***login Err****', err);
        this.emit('connectionFailure');
        return;
      }
      this._conn = jsConnection;
      this._userInfo = res;
      logger.debug('Enter SfService.createConnection Initialized, Connected event fired...');
      this.emit('connected');
    });
  }

  // ====================================================== //
  // Intialize Connection
  // ===================================================== //
  init(config) {
    this._config = config;
    return this.createConnection();
  }
}

const sfService = new SfService();
module.exports = sfService;