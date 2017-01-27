/**
 * Represents one instance of an sObject, complete with metadata and data record
 */

let globalMetadata = require('./../metadata');
let DataAccess = require('./../db/dao');
let Query = require('./../db/query');
let sfService = require('./../api/sfService');
const logger = require('./../logger/logger');

class sObject {

  constructor(sObjectName, userId) {
    this.sObjectName = sObjectName;
    this.userId = userId;
  }

  _queryAll(callback) {
    logger.debug('Entering sObject._queryAll');
    const metadataResult = this.retrieveMetadata();

    const allFields = this.getListViewFields(metadataResult);
    logger.debug('All fields', allFields);

    const databaseQuery = Query.queryAll(metadataResult.theme.dbName, allFields, this.userId,
                                         metadataResult.theme.shareName);
    logger.debug('Database Query', databaseQuery);

    sfService.query(databaseQuery, callback);
  }

  queryAllSObject() {
    return new Promise((resolve, failure) => {
      try {
        this._queryAll(function (err, result) {
          if (err) {
            logger.error('QueryAll SObject Error', err);
            failure(err);
            return;
          }
          logger.debug('Query All SObject Result', result);
          resolve(result);
        });
      } catch (error) {
        failure(error);
      }

    });
  }
  
  _delete(recordId, callback) {
    logger.debug('Entering sObject._delete');
    const metadataResult = this.retrieveMetadata();

    const dataAccess = new DataAccess(this.sObjectName, 'delete', metadataResult, null);
    dataAccess.validateCRUD();
    
    sfService.delete(metadataResult.theme.dbName, recordId, callback);
  }

  _queryEdit(recordId, callback) {
    logger.debug('Entering sObject._query');
    const metadataResult = this.retrieveMetadata();

    const detailFields = this.getDetailFields(metadataResult);
    logger.debug('Detail fields', detailFields);

    const databaseQuery = Query.query(metadataResult.theme.dbName, detailFields, recordId, this.userId, metadataResult.theme.shareName);
    logger.debug('Database Query', databaseQuery);

    sfService.query(databaseQuery, callback);

  }
  
  _query(recordId, mode, callback) {
    logger.debug('Entering sObject._query' , recordId, mode);
    const metadataResult = this.retrieveMetadata();

    let queryMode = mode === 'edit'? 'edit': 'detail';
    let viewFields = null;

    if (queryMode === 'detail' ) {
      viewFields = this.getDetailFields(metadataResult);
    }
    else {
      viewFields = this.getEditFields(metadataResult);
    }
    logger.debug('view Fields', viewFields);

    const databaseQuery = Query.query(metadataResult.theme.dbName, viewFields, recordId, this.userId,
                                  metadataResult.theme.shareName);
    logger.debug('Database Query', databaseQuery);

    sfService.query(databaseQuery, callback);
  }

  extractRecord(result) {
    let record = Array.isArray(result) ? result[0] : result;

    // attributes property is attached to the record, we dont need, git rid of it
    delete record.attributes;
    return record;
  }

  query(recordId, mode) {
    logger.debug('Entering sobject.query', recordId);
    return new Promise((resolve, failure) => {
      try {
        this._query(recordId, mode, (err, result) => {
          if (err) {
            failure(err);
            return;
          }
          logger.debug('Exit sObject.query', result);
          resolve(this.extractRecord(result));
        });
      }
      catch (error) {
        failure(error);
      }
    });
  }
  
  getEditFields(metadata) {
    logger.debug('Entering sObject.getEdit Fields');
    const dataAccess = new DataAccess(this.sObjectName, 'update', metadata, null);
    return dataAccess.queryEdit();
  }

  getDetailFields(metadata) {
    logger.debug('Entering sObject.getDetail Fields');
    const dataAccess = new DataAccess(this.sObjectName, 'read', metadata, null);
    return dataAccess.query();
  }

  getListViewFields(metadata) {
    logger.debug('Entering sObject.getListViewFields');
    const dataAccess = new DataAccess(this.sObjectName, 'read', metadata, null);
    return dataAccess.queryAll();
  }

  create(body) {
    logger.debug('Entering sObject.create', body);
    return new Promise((resolve, failure) => {
      try {
        this._processSObjectCreate(body, 'create', (err, result) => {
          if (err) {
            failure(err);
            return;
          }
          logger.debug('Exit sObject.create', result);
          resolve(result);
        });
      }
      catch (error) {
        failure(error);
      }
    });
  }

  delete(recordId) {
    logger.debug('Entering sObject.delete', recordId);
    return new Promise((resolve, failure) => {
      try {
        this._delete(recordId, (err, result) => {
          if (err) {
            failure(err);
            return;
          }
          logger.debug('Exit sObject.delete', result);
          resolve(result);
        });
      }
      catch (error) {
        logger.debug('Exit sObject.delete', error);
        failure(error);
      }
    });
  }

  update(recordId, body) {
    logger.debug('Entering sObject.update', body);
    return new Promise((resolve, failure) => {
      try {
        this._processSObjectUpdate(recordId, body, 'update', (err, result) => {
          if (err) {
            failure(err);
            return;
          }
          logger.debug('Exit sObject.update', result);
          resolve(result);
        });
      }
      catch (error) {
        failure(error);
      }
    });
  }

  _processSObjectUpdate(recordId, body, operation, callback) {
    logger.debug('Entering sObject._processSObjectUpdate');
    const metadataResult = this.retrieveMetadata();

    const dataAccess = new DataAccess(this.sObjectName, operation, metadataResult, body);
    let dataResult = dataAccess.validateForCreateUpdate();
    logger.debug('dataResult after validation', dataResult);

    if (dataResult.error && dataResult.error.length > 0) {
      callback({success: false, errors: dataResult.error});
      return;
    }

    const dbRecord = Query.update(dataResult.body, recordId, this.userId);
    logger.debug('Database Update ', dbRecord);
    
    sfService.update(metadataResult.theme.dbName, dbRecord, callback);
  }


  _processSObjectCreate(body, operation, callback) {
    logger.debug('Entering sObject._processSObjectCreate');
    const metadataResult = this.retrieveMetadata();

    const dataAccess = new DataAccess(this.sObjectName, operation, metadataResult, body);
    let dataResult = dataAccess.validateForCreateUpdate();
    logger.debug('dataResult after validation', dataResult);

    if (dataResult.error && dataResult.error.length > 0) {
      callback({success: false, errors: dataResult.error});
      return;
    }

    const dbRecord = Query.create(dataResult.body, this.userId);
    logger.debug('Database Create ', dbRecord);

    sfService.create(this.sObjectName, dbRecord, callback);
  }

  retrieveMetadata() {
    logger.debug('Entering sObject.retrieveMetadata', this.sObjectName);
    let metadataResult = globalMetadata[this.sObjectName];

    logger.debug('Metadata read', metadataResult);

    if (!metadataResult) {
      throw new Error(`Metadata is not configured for ${this.sObjectName}`);
    }

    logger.debug('Exit sObject.retrieveMetadata', metadataResult);
    return metadataResult;
  }
}

module.exports = sObject;