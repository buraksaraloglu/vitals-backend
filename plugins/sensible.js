'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

const config = require('../config/app');

module.exports = fp(async function (fastify, options) {
	fastify.register(require('fastify-sensible'), {
		errorHandler: config.errorHandler
	});
});
