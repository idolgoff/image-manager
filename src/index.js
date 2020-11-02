// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true,
});
require('./check-config');

const queue = require('./queue');
const callWebHook = require('./call-web-hook');

queue.onComplete((job, result) => {
    console.log('========');
    fastify.log.info({job, result});
    const {webHook} = job.data;
    if (webHook) callWebHook(webHook, result);
});

// Declare a route
fastify.get('/', async function(request, reply) {
    console.log('Root called, params: ', request.params);
    return 'Nothing here';
});

fastify.route({
    method: 'POST',
    url: '/queue',
    schema: {
        response: {
            200: {
                type: 'string',
            },
        },
    },
    handler: function(req, res) {
        console.log(req.params, req.body);
        // verify params
        // const imageUrl = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg';
        queue.add(req.body);
        res.send('ok');
    },
});

// Run the server!
fastify.listen(3000, (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`);
});
