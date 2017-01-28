'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var logger = require('../../logger/logger');
let metadata = require('./../../metadata');

var router = express.Router();

router.post('/sign' , function(req, res, next) {
	logger.debug('Inside the Sign method');
	var token = auth.signToken({'id': 'Ritesh'}, (err, token) => {
		logger.debug('Token generated', token);
		res.json({token : token});
	});

	logger.debug('Exit the Sign method');
});

router.post('/', function (req, res, next) {
	logger.debug('Entering login');

	passport.authenticate('local', {session: false}, function (err, user) {
		logger.debug('local.index callback received');
		logger.debug('Inside the Authenticate method', err, user);
		var error = err;
		if (error) return res.json(401, { message : error.message});
		if (!user) return res.json(404, { message: 'Something went wrong, please try again.' });

		logger.info('***Auth is about o Sign Token******');
		var token = auth.signToken(user, (err, token) => {
			logger.info('*****Token Signed****')
			if(err) {
				res.status(500).send({ message: 'Something went wrong in generating token, please try again.' });
			}
			logger.info('Token generated', token);
			res.json({ user: user, token: token });
		});

	})(req, res, next)
});

module.exports = router;