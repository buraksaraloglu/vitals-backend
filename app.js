'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
const rateLimit = require('fastify-rate-limit');

const config = require('./config/app');

module.exports = async function (fastify, options) {
	fastify.register(require('fastify-cors'), {
		origin: '*'
	});

	fastify.register(require('fastify-redis'), {
		url: config.redis,
	});

	fastify.register(rateLimit, {
		max: 4, // Only 4 request per second
		timeWindow: 1000
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, options)
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, options)
	});
};
