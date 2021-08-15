const fp = require('fastify-plugin');
const mongoose = require('mongoose');

const config = require('../config/app');

module.exports = fp(async (fastify, options) => {
	try {
		const url = config.mongoDBUrl;
		const database = await mongoose.connect(url, {
			useNewUrlParser: true
		});
		console.log('Database is connected');
		fastify.decorate('db', database);
	} catch (error) {
		console.log(error);
	}
});

