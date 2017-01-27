let _ = require('lodash');
/**
 * Responsible for generating the final queries, including related to user Id etc, to be fired on SFDC
 */
class Query {

    queryAll(sObjectName, fields, userId, shareFieldName) {
        let shareQuery = this.getShareQuery(shareFieldName, userId);
        return `SELECT ${fields.join()},id FROM ${sObjectName} WHERE Id IN ${shareQuery} LIMIT 200`;
    }

    query(sObjectName, fields, recordId, userId, shareFieldName) {
        // if (_.indexOf(fields, 'Name') === -1) {
        //    fields.push('Name');
        // }

        let shareQuery = this.getShareQuery(shareFieldName, userId);
        return `SELECT ${fields.join()},Id FROM ${sObjectName} WHERE id = '${recordId}' AND Id IN ${shareQuery} LIMIT 1`;
    }

    getShareQuery(shareFieldName, userId) {
        return ` ( SELECT ${shareFieldName} FROM Portal_Share__c WHERE Portal_User__c = '${userId}' )`;
    }
    getShareName(sObjectName) {
        return `${sObjectName}__c`;
    }

    update(body, recordId, userId) {
        let sObject = body;
        sObject.Id = recordId;
        return sObject;
    }

    create(body, userId) {
        let sObject = body;
        return sObject;
    }
}

const query = new Query();
module.exports = query;