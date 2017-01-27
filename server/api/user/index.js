'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.show);
router.put('/', controller.update);

module.exports = router;