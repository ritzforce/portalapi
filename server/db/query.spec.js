const sObjectConfig = require('./testSObject');
const DAO = require('./dao');
const Query = require('./query');

describe('Query Specifications', function() {
    
    it('Query All' ,function() {
        const dao = new DAO(sObjectConfig.theme.dbName, 'read', sObjectConfig, null);
        let fields =  dao.queryAll();
        let query = Query.queryAll(sObjectConfig.theme.dbName, fields, '0050123');
        console.log('**query***', query);
    });

    it('Query' ,function() {
        const dao = new DAO(sObjectConfig.theme.dbName, 'read', sObjectConfig, null);
        let fields =  dao.query();
        let query = Query.query(sObjectConfig.theme.dbName, fields, '001001290' ,'0050123');

        console.log('**query***', query);
    });
    
});
