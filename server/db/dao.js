/*******************************************************************
 * Main Class,
 * validates CRUD
 * validates only the allowed fields are posted back to SFDC
 * Data types validation is left for Salesforce to validate
 * gives a proper sfdc object, that can be passed to SFDC service
 *******************************************************************/
const _ = require('lodash');
const logger = require('./../logger/logger');


class DAO {
    // sObject, for which everything has to be done, it is actually the metadata
    // sObjName is the name of the SObject Name for operation is to be done
    // operation is the name of the operation like READ, CREATE, UPDATE, DELETE
    // sObjectConfiguration is the configuration information containing all the JSON
    // bodyJSON contains all the response.body

    constructor(sObjName, operation, sObjectConfig, bodyJSON) {
        this.sObjName = sObjName;
        this.sObjectConfig = sObjectConfig;
        this.operation = operation;
        this.bodyJSON = bodyJSON;
    }

    doBaseValidation() {
        if (!this.sObjectConfig) {
            throw new Error('Object Name' + this.sObjName + ' is not found');
        }
        this.validateCRUD();
    }

    // Query A Single Record, extract all fields that are available for Querying for a single object
    query() {
        this.doBaseValidation();
        const fieldConfig = this.retrieveFields();
        return this.extractFields (fieldConfig);
    }
    // Query Fields for a Single Record, for all fields in edit view
    queryEdit() {
        this.doBaseValidation();
        const fieldConfig = this.retrieveFieldsEditView();
        return this.extractFields(fieldConfig);
    }

    // Query all Records, available for Querying objects
    queryAll() {
        this.doBaseValidation();
        const fieldConfig = this.retrieveListViewFields();
        return this.extractFields (fieldConfig);
    }

    // Extract fields from the field config object
    extractFields(fieldConfig) {
        const fields = [];
        for (const fieldName of Object.keys(fieldConfig)) {
            fields.push(fieldName);
        }
        return fields;
    }

    // Do validation for Create and Update Operation
    validateForCreateUpdate() {
        this.doBaseValidation();
        const fieldConfig = this.retrieveFieldsEditView();

        this.checkValidFieldsPresentInBodyJSON(fieldConfig);
        let errorArray = this.validateFields(fieldConfig);

        // Return all our server side validations have been done, no hard feelings
        return {
            body: this.bodyJSON,
            error: errorArray
        };
    }

    checkValidFieldsPresentInBodyJSON(fieldConfig) {
        logger.debug('Entering dao.checkValidFieldsPresentInBodyJSON', fieldConfig);

        for(const formFieldName of Object.keys(this.bodyJSON)) {
            if(formFieldName == "Id") {
                continue;
            }

            if(!fieldConfig[formFieldName]) {
                throw new Error(`"${formFieldName}" is not a valid field for ${this.sObjName}`);
            }
        }
        logger.debug('Exit dao.checkValidFieldsPresentInBodyJSON');
    }

    handleIsRequired(fieldName, field, bodyJSON) {
        // This field is required and a value is present, okay skip
        if (bodyJSON[fieldName]) {
            return false;
        }
        return true;
    }

    handleIsReadOnly(fieldName, field, bodyJSON) {
        // Read Only and no value is present its the best, simple go back
        if(!bodyJSON[fieldName]) {
            return;
        }
        // if present, simply delete the keys
        delete this.bodyJSON[fieldName];
    }
    
    createErrorForRequiredFields(requiredFieldError) {

        if (requiredFieldError.length == 0) {
            return null;
        }
        const joinedFields = requiredFieldError.join();
        return {
            message: `Required fields are missing: [${joinedFields}]`,
            errorCode: 'REQUIRED_FIELD_MISSING',
            fields: requiredFieldError
        }
    }

    validateFields(fieldConfig) {
        logger.debug('Enter dao.validateFields', fieldConfig);

        let isRequired = false;
        let isReadOnly = false;
        let errorArray = [];

        let requiredFieldErrorFields = [];

        for (const fieldName of Object.keys(fieldConfig)) {
            const field = fieldConfig[fieldName];
            isRequired = (field.required === true)
            isReadOnly = (field.readOnly === true);

            if (isRequired) {
                let error = this.handleIsRequired(fieldName, field, this.bodyJSON);
                if (error) {
                    requiredFieldErrorFields.push(fieldName);
                }
            }
            if (isReadOnly) {
                this.handleIsReadOnly(fieldName, field, this.bodyJSON);
            }
        }
        let requiredFieldError = this.createErrorForRequiredFields(requiredFieldErrorFields);

        if (!requiredFieldError) { // If null, return empty array
            return []
        }

        logger.debug('Exit dao.validateFields', requiredFieldError);

        // Other Errors can be encased in this array
        return [requiredFieldError];
    }

    validateCRUD() {
        const permissions = this.sObjectConfig.permissions;
        if (!permissions) {
            throw new Error(`Permissions not set for object "${this.sObjName}"`);
        }
        if (permissions[this.operation] === true) {
            return true;
        }
        throw new Error(`Operation "${operation}" is not permitted for object "${this.sObjName}"`);
    }

    retrieveListViewFields() {
        let listView = this.sObjectConfig.listView;
        const fieldConfig = {};

        for (const field of listView) {
            fieldConfig[field.name]  = field;
        }
        return fieldConfig;
    }

    retrieveFields() {
        return this.retrieveFieldsForView(this.sObjectConfig.detailView);
    }
    retrieveFieldsEditView() {
        let view = this.sObjectConfig.editView;
        if (!view) {
            view = this.sObjectConfig.detailView;
        }
        return this.retrieveFieldsForView(view);
    }

    retrieveFieldsForView(view) {

        if (!view) {
            throw new Error(`No Edit / Detail View configured for object "${this.sObjName}"`);
        }
        const fieldConfig = {};

        for (const section of view) {
            for (const field of section.fields) {
                if (!_.isEmpty(field)) {
                    fieldConfig[field.name] = field;
                }
            }
        }
        if( Object.keys(fieldConfig).length === 0 ) {
            throw new Error(`No fields available in Edit or Detail View for "${this.sObjName}"`);
        }
        return fieldConfig;
    }
}

module.exports = DAO;