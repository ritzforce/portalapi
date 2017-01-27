'use strict';

const logger = require('./../../logger/logger');
const Model = require('./../../models/sObject');
const _ = require('lodash');

// ============================================================//
// Get a single record for the related SObject Type
// ============================================================//
exports.show = function (req, res) {
    logger.debug('Entering exports.show Portal User Controller', req.params);
    let sObjectName = req.params.sObject;
    const model = new Model('Portal_User__c', 1);

    model.query(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    logger.debug('Entering exports.update Portal User Controller', req.params);

    const model = new Model('Portal_User__c', 1);

    model.update(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            handleError(res, err);
        });
};


function handleError(res, err) {
    logger.log('Error In Portal User.Controller');
    logger.error(err);
    return res.status(500).json(err);
}