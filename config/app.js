const loadEnvironmentVariable = (key) => {
	const environmentVariable = process.env[key];

	if (!environmentVariable) throw new Error(`Must include ${key} as an environment variable`);

	return environmentVariable;
};

module.exports = {
	mongoDBUrl: loadEnvironmentVariable('MONGODB_URL'),
	mongoDBDatabase: loadEnvironmentVariable('MONGODB_DB'),
	redis: loadEnvironmentVariable('REDIS_URL'),
};
