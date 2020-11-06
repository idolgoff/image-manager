const queueRoutes = require('./v1/queue'); // routes array

const v1 = {
    queueRoutes,
};

const registerRoutes = (app) => {
    v1.queueRoutes.forEach((route) => {
        app.register(route, {prefix: '/v1/queue'});
    });
};

module.exports = {
    registerRoutes,
};
