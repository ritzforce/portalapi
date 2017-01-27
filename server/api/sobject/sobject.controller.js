'use strict';

const logger = require('./../../logger/logger');
const Model = require('./../../models/sObject');
const _ = require('lodash');

// ==================================================================
// Get list of all objects for the sObject
// ==================================================================
exports.index = function (req, res) {
    logger.debug('Entering exports.index sObject Controller', req.params);
    let sObjectName = req.params.sObject;
    const model = new Model(sObjectName, req.user.id);

    model.queryAllSObject()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });
};

// ============================================================//
// Get a single record for the related SObject Type
// ============================================================//
exports.show = function (req, res) {
    logger.debug('Entering exports.show sObject Controller', req.params);
    let sObjectName = req.params.sObject;
    const model = new Model(sObjectName, req.user.id);

    model.query(req.params.id, req.params.mode)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });
};



// Creates a new thing in the DB.
exports.create = function (req, res) {
    logger.debug('Entering exports.create sObject Controller', req.params);

    let sObjectName = req.params.sObject;
    const model = new Model(sObjectName, req.user.id);

    model.create(req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });

};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    logger.debug('Entering exports.update sObject Controller', req.params);

    let sObjectName = req.params.sObject;
    const model = new Model(sObjectName, req.user.id);

    logger.debug('sObject.Controller body', req.body);
    
    model.update(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    logger.debug('Entering exports.delete sObject Controller', req.params);

    let sObjectName = req.params.sObject;
    const model = new Model(sObjectName, req.user.id);
    
    model.delete(req.params.id)
      .then(result => {
          res.status(200).json(result);
      })
      .catch(err => {
          handleError(res, err);
      });
};

function handleError(res, err) {
    logger.log('Error In sObject.Controller');
    logger.error(err);
    return res.status(500).json({ message : err.message });
}