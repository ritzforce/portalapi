'use strict';
let sfService = require('./../api/sfService');

/****************************************
 Current logged in User class and Model
 ****************************************/
class User {

    constructor(id) {
        this.id = id;
        this.username = '';
        this.password = '';
    }
    
    populateUserDetails(record) {
        let dbUser = record;
        if ( Array.isArray(record)) {
            dbUser = record[0];
        }

        this.id = dbUser.Id;
        this.name = dbUser.Name;
        this.email = dbUser.Email__c;
    }

    findOne(username, callback) {
        console.log('***sfService****', sfService);
        sfService.loginPortalUser(username, (err, userArray) => {
            if (err) {
                callback(err, null);
                return;
            }
            this.username = username;
            this.populateUserDetails(userArray);
            callback(null, this);
        });
    }

    findById(id) {
        return new User(id);
    }

    authenticate(password) {
        return true;
    }
}


module.exports = User;