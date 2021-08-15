const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
	fastify.register(require('fastify-swagger'), {
		routePrefix: '/swagger',
		swagger: {
			info: {
				title: 'Janus - Tradegraf',
				description: 'Exchange connection service for Tradegraf Client',
				version: '0.1.0',
			},
			host: `localhost:${process.env.PORT}`,
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				{ name: 'exchange', description: 'Exchange related end-points' },
				{ name: 'broker', description: 'Exchange broker related end-points' },
			],
		},
		uiConfig: {
			docExpansion: 'full',
			deepLinking: false,
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		exposeRoute: true,
	});
});
