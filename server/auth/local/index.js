'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var logger = require('../../logger/logger');
let metadata = require('./../../metadata');

var router = express.Router();

router.post('/', function (req, res, next) {
	logger.debug('Entering login');

	passport.authenticate('local',{session: false}, function (err, user, info) {
		logger.debug('Inside the Authenticate method', err, user, info);
		var error = err || info;
		if (error) return res.json(401, {message : error.message});
		if (!user) return res.json(404, { message: 'Something went wrong, please try again.' });

		logger.info('***authentication successful*****');
		logger.info(user);
		
		var token = auth.signToken(user, (err, token) => {
			if(err) {
				res.status(500).send({ message: 'Something went wrong in generating token, please try again.' });
			}
			logger.info('Token generated', token);
			res.json({ user: user, token: token });
		});

	})(req, res, next)
});

module.exports = router;