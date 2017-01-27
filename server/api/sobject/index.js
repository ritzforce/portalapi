'use strict';

var express = require('express');
var controller = require('./sobject.controller');
var auth = require('./../../auth/auth.service');

var router = express.Router();

router.get('/:sObject', auth.isAuthenticated(), controller.index);
router.get('/:sObject/:id/:mode', auth.isAuthenticated(), controller.show);
router.get('/:sObject/:id', auth.isAuthenticated(), controller.show);
router.post('/:sObject', auth.isAuthenticated(), controller.create);
router.put('/:sObject/:id', auth.isAuthenticated(), controller.update);
router.patch('/:sObject/:id', auth.isAuthenticated(), controller.update);
router.delete('/:sObject/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;