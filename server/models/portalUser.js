/*
 * Portal User represents a user, that can login in the system
 */

let DataAccess = require('./../db/dao');
let Query = require('./../db/query');
let sfService = require('./../api/sfService');
const logger = require('./../logger/logger');

class PortalUser {

  constructor(username) {
    this.username = username;
  }

  _query(callback) {
    if (!this.id) {
      throw Error('User Id not Initialized, cannot query');
    }

    let dbQuery = `SELECT id, first_name__c, last_name__c, username__c, email__c FROM Portal_User__c WHERE Id = '${this.id}'`;
    sfService.query(dbQuery, callback);
  }

  query() {
    logger.debug('Entering PortalUser.query');
    return new Promise((resolve, failure) => {
      try {
        this._query((err, result)=> {
          if (err) {
            logger.debug('Exit PortalUser.query, err received in callback', err);
            failure(err);
            return;
          }
          logger.debug('Exit PortalUser.query, result received callback', result);
          resolve(result);
        })
      } catch (error) {
        logger.debug('Exit PortalUser.query, exception thrown ', error);
        failure(error);
        return;
      }
    });
  }

  _update(body, callback) {
    //TODO: If the body contains anything other than first_name,last_name,email__c, ignore
    sfService.update('Portal_User__c', body, callback);
  }

  update() {
    logger.debug('Entering PortalUser.update');
    return new Promise((resolve, failure) => {
      try {
        this._update(body, (err, result)=> {
          if (err) {
            logger.debug('Exit PortalUser.update, err received in callback', err);
            failure(err);
            return;
          }
          logger.debug('Exit PortalUser.update, result received callback', result);
          resolve(result);
        })
      } catch (error) {
        logger.debug('Exit PortalUser.update, exception thrown ', error);
        failure(error);
        return;
      }
    });
  }
  
  _populateUser(dbUser) {
    if (!dbUser) return null;

    const user = {
      username: this.username,
      name: dbUser.Name,
      email: dbUser.Email__c,
      first_name__c: dbUser.First_Name__c,
      last_name__c: dbUser.Last_Name__c,
      id: dbUser.Id,
    }
    return user;
  }

  _getDatabaseUser(result) {
    logger.debug('get Database User', JSON.stringify(result));

    if( Array.isArray(result) ) {
      if (result.length > 0) {
        return result[0];
      }
      return null;
    }
    return result;
  }

  login(password, callback) {
    logger.debug('Entering PortalUser.login');

    const that = this;
    try {
      sfService.loginPortalUser(that.username, (err, result) => {
        if (err) {
          logger.debug('Exit PortalUser.login, err received in callback', err);
          callback(err, null);
          return;
        }
        logger.debug('PortalUser.login, result received callback', result);
        let dbUser = that._getDatabaseUser(result);
        let user = that._populateUser(dbUser);

        if (!user) {
          callback(null, null);
          return;
        }

        logger.debug('User object sent back to caller', user);
        // Validate password here
        if (!password === dbUser.Password__c) {
          callback(null, null);
          return;
        }
        
        callback(null,user);
      })
    } catch (error) {
      logger.debug('Exit PortalUser.login, exception thrown ', error);
      callback(error, null);
      return;
    }

  }
}

module.exports = PortalUser;