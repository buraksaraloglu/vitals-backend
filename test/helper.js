'use strict';

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../app');

const config => () => {
	return {};
}

const build => (t) => {
	const app = Fastify();

	app.register(fp(App), config());

	t.teardown(app.close.bind(app));

	return app;
}

module.exports = {
	config,
	build
};
