const sObjectConfig = require('./../db/testSObject');
const DAO = require('./../db/dao');
const Query = require('./../db/query');

let sfService = require('./sfService');

describe("Test SfService", function () {
    this.timeout(2000 * 10);
    process.env.NODE_ENV = 'test';
    let config = require('./../config/environment');
    sfService.init(config);

    it.skip('SF Service Query All', function (done) {
        const dao = new DAO(sObjectConfig.theme.dbName, 'read', sObjectConfig, null);
        let fields = dao.queryAll();
        let query = Query.queryAll(sObjectConfig.theme.dbName, fields, '0050123');

        sfService.query(query, function (err, result) {
            if (err) {
                console.log('Error', err);
            }
            done();
        });
    });

    it.skip('SF Service Query', function (done) {
        const dao = new DAO(sObjectConfig.theme.dbName, 'read', sObjectConfig, null);
        let fields = dao.query();
        let query = Query.query(sObjectConfig.theme.dbName, fields, 'a0A2800000ITHcw');

        sfService.query(query, function (err, result) {
            if (err) {
                console.log('Error', err);
            }
            done();
        });
    });

    it("Update SF Scratch Record", function(done) {
        let postBody = {
            name: 'ABCDEF Updated',
            description__c: 'ABDC',
            comments__c: 'The Comments are not used',
            discount__c: 6
        };

        const dao = new DAO(sObjectConfig.theme.dbName, 'update', sObjectConfig, postBody);
        let sfBody = Query.update(postBody,'a0A2800000ITIeO','005790999');
        console.log('*****************************************************');
        console.log(sfBody);

        sfService.update(sObjectConfig.theme.dbName, sfBody, function (err, result) {
            if (err) {
                console.log('******ERROR IN Updation*****');
                console.warn(err);
            }
            console.log('***Update Result');
            console.log(result);

            done();
        });
    })

    it.skip('Insert SF Scratch Record', function (done) {
        let postBody = {
            name: 'ABCDEF',
            description__c: 'CDEF',
            comments__c: '9110',
            discount__c: 5
        };

        const dao = new DAO(sObjectConfig.theme.dbName, 'create', sObjectConfig, postBody);
        let sfBody = Query.create(postBody, '005790999');
        sfService.create(sObjectConfig.theme.dbName, sfBody, function (err, result) {
            if (err) {
                console.log('******ERROR IN CREATION*****');
                console.warn(err);
            }
            console.log('***Create Result');
            console.log(result);

            done();
        });

    });


});