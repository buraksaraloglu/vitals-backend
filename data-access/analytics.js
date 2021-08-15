/* eslint-disable sonarjs/no-duplicate-string */
const fp = require('fastify-plugin');
const boom = require('boom');
const moment = require('moment');

const VitalAnalytics = require('../model/vital-analytics');

const AnalyticsDataAccess = () => {
	const getVitalAnalytics = async ({ vital, start, end }) => {
		const aggregation = [
			{
				$match: {
					name: vital,
					createdAt: {
						$gte: new Date(start),
						$lte: new Date(end)
					}
				}
			},
			{
				$project: {
					year: 0,
					dayOfYear: 0,
				}
			},
			{
				$group: {
					_id: {
						$minute: '$createdAt'
					},
					count: { $avg: '$value' },
				}
			},
		];

		return await VitalAnalytics
			.aggregate(aggregation)
			.exec()
			.then(response => response);
	};

	const createBatchAnalytics = async ({ data }) => {
		try {
			return await VitalAnalytics.insertMany(data.map(vital => ({
				...vital,
				createdAt: moment().toISOString(),
				updatedAt: moment().toISOString(),
			})))
				.then((response) => response);
		} catch (error) {
			throw boom.boomify(error);
		}
	};

	return {
		getVitalAnalytics,
		createBatchAnalytics,
	};
};

module.exports = fp(async (fastify) => {
	fastify.decorate('analyticsDA', AnalyticsDataAccess());
});
