'use strict';

const fastify = require('fastify');

const {registerRoutes} = require('./routes');

const build = (opts={}) => {
    const app = fastify(opts);
    registerRoutes(app);
    return app;
};

module.exports = build;
