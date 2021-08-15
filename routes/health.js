module.exports = async function (fastify, options) {
	fastify.route({
		method: 'GET',
		url: '/',
		schema: {
			tags: ['healthcheck'],
			response: {
				200: {
					type: 'object',
					properties: {
						status: { type: 'string' },
						message: {
							type: 'string',
							format: 'date-time',
						},
					},
				},
			},
		},
		handler: async (request, reply) => ({
			status: 'ok',
			message: new Date().toISOString(),
		}),
	});
};
