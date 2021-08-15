const fp = require('fastify-plugin');
const _ = require('lodash');

const AnalyticsDataAccess = require('../data-access/analytics');
const { getValidDates } = require('../utils/helpers');

const AnalyticsHandlers = (fastify) => {
	fastify.register(AnalyticsDataAccess);

	const getFCPAnalytics = async (request, reply) => {
		try {
			// Can be moved to global config file
			const fcpRedisKey = 'fcp';

			// Can be implemented as plugin in future versions.
			fastify.redis.get(fcpRedisKey, (error, value) => {
				if(!_.isEmpty(value)) return reply.code(200).send(JSON.parse(value));
			});

			const { startDate, endDate } = request.query;

			const { startDate: start, endDate: end } = getValidDates({ startDate, endDate });

			const response = await fastify.analyticsDA.getVitalAnalytics({ vital: 'FCP', start, end });

			fastify.redis.set(fcpRedisKey, JSON.stringify(response)).then(() => {
				fastify.redis.expire(fcpRedisKey, 60);
				return reply.code(200).send(response);
			});
		} catch (error) {
			return reply.code(400).send(error);
		}
	};

	const getTTFBAnalytics = async (request, reply) => {
		try {
			const ttfbRedisKey = 'ttfb';

			fastify.redis.get(ttfbRedisKey, (error, value) => {
				if(!_.isEmpty(value)) return reply.code(200).send(JSON.parse(value));
			});

			const { startDate, endDate } = request.query;

			const { startDate: start, endDate: end } = getValidDates({ startDate, endDate });

			const response = await fastify.analyticsDA.getVitalAnalytics({ vital: 'TTFB', start, end });

			fastify.redis.set(ttfbRedisKey, JSON.stringify(response)).then(() => {
				fastify.redis.expire(ttfbRedisKey, 60);
				return reply.code(200).send(response);
			});
		} catch (error) {
			return reply.code(400).send(error);
		}
	};

	const createAnalyticsReport = async (request, reply) => {
		try {
			const { body } = request;
			const { metrics } = JSON.parse(body);

			await fastify.analyticsDA.createBatchAnalytics({ data: metrics });

			// We can just send 201 as a response, othervise it would increase the response size to 600~bytes
			return reply.code(201).send();
		} catch (error) {
			// We can improve this by sending custom error messages.
			return reply.code(400).send(error);
		}
	};

	return {
		getFCPAnalytics,
		getTTFBAnalytics,
		createAnalyticsReport,
	};
};

module.exports = fp(async (fastify) => {
	fastify.decorate('analyticsHandlers', AnalyticsHandlers(fastify));
});
