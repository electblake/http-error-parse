'use strict';
var _ = require('lodash');

exports.getMessage = function(err, done) {
	var message = '';
	if (_.isObject(err)) {
		if (!_.isUndefined(err.toString())) {
			message = err.toString();
		} else {
			mesasge = err.message;
		}
	}
	return message;
};

exports.getMessageSync = function(err) {
	return exports.getMessage(err, function(message) {
		return message;
	});
};

exports.getHTTPCodeSync = function(err) {
	return exports.getHTTPCode(err, function(code) {
		return code;
	});
};
// alias
exports.getCodeSync = exports.getHTTPCodeSync;

exports.getHTTPCode = function(err, done) {

	// defaults
	var _defaultCode = 400;
	var _code = _defaultCode;
	var _message = '';

	if (_.isObject(err)) {
		if (!_.isUndefined(err.toString())) {
			_message = err.toString();
		} else {
			_message = err.message;
		}
	} else if (_.isNumber(err)) {
		// err passed as code, return it
		return done(err);
	} else {
		console.log('getHTTPCodeFromError', err);
	}

	var findAndUpdateCode = function(newCode, list) {
		_.each(list, function(s, i) {
			if (_message.toLowerCase().indexOf(s.toLowerCase()) > -1) {
				_code = newCode;
			}
		});
	}

	findAndUpdateCode(401, ['unauthorized', 'access denied', 'user not found', 'must be logged in', 'accessToken', 'acces-token']);

	// check if its changed and return
	if (_code !== _defaultCode) {
		return done(_code);
	}

	findAndUpdateCode(404, ['missing', 'not found', 'could not find']);

	// check if its changed and return
	if (_code !== _defaultCode) {
		return done(_code);
	}

	findAndUpdateCode(408, ['request timeout', 'timeout', 'too long']);

	// check if its changed and return
	if (_code !== _defaultCode) {
		return done(_code);
	}

	findAndUpdateCode(501, ['not yet implemented', 'coming soon']);

	// check if its changed and return
	if (_code !== _defaultCode) {
		return done(_code);
	}

	// if we're here, just return it
	return done(_code);
}
// alias
exports.getCode = exports.getHTTPCode;