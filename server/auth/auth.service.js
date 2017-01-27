'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var logger = require('./../logger/logger');
var User = require('./user');

var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
	return compose()
		// Validate jwt
		.use(function (req, res, next) {

			logger.info('***Access token***' + req.headers.authorization);

			if(!req.headers.authorization) {
				next(new Error('Authorization Header is not set'));
				return;
			}

			let arr = req.headers.authorization.split(' ');

			if (arr && arr.length > 1) {
				console.log('Authorization*****', arr[1]);
				try {
					let decoded = jwt.verify(arr[1].trim(), config.secrets.session);
					req.user = decoded;
					console.log('***req.user***', req.user);
					next();
				}
				catch(err) {
					next(new Error('Signature is invalid'));
					return;
				}
			}
		})
		// Attach user to request
		.use(function (req, res, next) {
			logger.info('*****USER ATTACHED TO REQUEST****', req.user);
			if (!req.user) {
				next(new Error('User is not set'));
				return;
			}
			next();
		});
}

function isAdminRole(req){
	if(!req.user){
		return false;
	}
	var user = req.user;
	return (user.role === 'admin');
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
	if (!roleRequired) throw new Error('Required role needs to be set');

	return compose()
		.use(isAuthenticated())
		.use(function meetsRequirements(req, res, next) {
			if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
				next();
			}
			else {
				res.send(403);
			}
		});
}


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(user, callback) {
	logger.debug('Enter auth.service sign web token');
	// Expires is set in seconds, let keep the token valid for an hour 60 * 60
	return jwt.sign(user, config.secrets.session, { expiresIn: 60 * 60 }, function(err, token) {
		 callback(err, token);
	});
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
	if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.' });
	var token = signToken(req.user._id, req.user.role);
	res.cookie('token', JSON.stringify(token));
	res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.isAdminRole = isAdminRole;