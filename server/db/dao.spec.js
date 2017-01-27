let assert = require("chai").assert;
let dao = require('./dao');
const sObjectConfig = require('./testSObject');

describe('Test DAO Object Operations', function () {
    it('Insert operation check', function () {
        const DAO = new dao('Scratch__c', 'create', sObjectConfig,
            {name: 'ABCD', comments__c: 'true'});

        let sObject = DAO.validateForCreateUpdate();
        console.log('*****sObject****' + JSON.stringify(sObject));
    })

    it('Query All Operation Check', function () {
        const DAO = new dao('Scratch__c', 'read', sObjectConfig, null);
        let fields = DAO.queryAll();
        if (fields) {
            console.log('****fields****', fields);
        }
    });

    it('Query', function() {
        const DAO = new dao('Scratch__c', 'read', sObjectConfig, null);
        let fields = DAO.query();
        if (fields) {
            console.log('***queryFields****', fields);
        }

    });

    it("Always Throw error", function() {
        throw new Error("Error is thrown to fail the test");
    })

});