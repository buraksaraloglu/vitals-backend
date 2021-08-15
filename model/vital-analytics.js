const mongoose = require('mongoose');

const { Schema } = mongoose;

const VitalAnalyticsModel = new Schema({
	name: String,
	time: Number,
	value: Number,
	createdAt: Date,
	updatedAt: Date,
});

const VitalAnalytics = mongoose.model('vital-analytic', VitalAnalyticsModel);

module.exports = VitalAnalytics;
