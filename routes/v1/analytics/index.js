const AnalyticsHandlers = require('../../../handlers/analytics');

module.exports = async function (fastify) {
	fastify.register(AnalyticsHandlers);

	fastify.route({
		method: 'GET',
		url: '/fcp',
		schema: {
			tags: ['analytics'],
			query: {
				type: 'object',
				properties: {
					startDate: {
						type: 'string',
					},
					endDate: {
						type: 'string',
					},
				},
				required: ['startDate', 'endDate'],
			},
			response: {
				// 200: {
				// 	type: 'array',
				// 	items: {
				// 		type: 'object',
				// 		properties: {
				// 			name: { type: 'string' },
				// 			_id: {
				// 				type: 'number',
				// 				minLength: 1,
				// 			},
				// 			count: {
				// 				type: 'number',
				// 				minLength: 1,
				// 			}
				// 		}
				// 	}
				// },
				500: {
					type: 'object',
					properties: {
						status: { type: 'string' },
						error: { type: 'string' },
					},
				},
			},
		},
		handler: async (request, reply) => fastify.analyticsHandlers.getFCPAnalytics(request, reply),
	});

	fastify.route({
		method: 'GET',
		url: '/ttfb',
		schema: {
			tags: ['analytics'],
			query: {
				type: 'object',
				properties: {
					startDate: {
						type: 'string',
					},
					endDate: {
						type: 'string',
					},
				},
				required: ['startDate', 'endDate'],
			},
			response: {
				// 200: {
				// 	type: 'array',
				// 	items: {
				// 		type: 'object',
				// 		properties: {
				// 			name: { type: 'string' },
				// 			_id: {
				// 				type: 'number',
				// 				minLength: 1,
				// 			},
				// 			count: {
				// 				type: 'number',
				// 				minLength: 1,
				// 			}
				// 		}
				// 	}
				// },
				500: {
					type: 'object',
					properties: {
						status: { type: 'string' },
						error: { type: 'string' },
					},
				},
			},
		},
		handler: async (request, reply) => fastify.analyticsHandlers.getTTFBAnalytics(request, reply),
	});

	fastify.route({
		method: 'POST',
		url: '/',
		schema: {
			tags: ['analytics'],
			payload: {
				type: 'object',
				properties: {
					pathName: {
						type: 'string',
						description: 'exchange label',
					},
					metrics: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
								},
								time: {
									type: 'number',
								},
								value: {
									type: 'number',
								}
							}
						}
					},
				},
				required: ['pathName', 'metrics'],
			},
			response: {
				201: {
					type: 'null',
				},
				400: {
					type: 'object',
					properties: {
						status: { type: 'string' },
						error: { type: 'string' },
						message: { type: 'string' },
					},
				},
				500: {
					type: 'object',
					properties: {
						status: { type: 'string' },
						error: { type: 'string' },
					},
				},
			},
		},
		handler: async (request, reply) => fastify.analyticsHandlers.createAnalyticsReport(request, reply),
	});
};
