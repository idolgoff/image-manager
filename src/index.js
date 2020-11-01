// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true,
});
require('./check-config');

const queue = require('./queue');
queue.onComplete((job, result) => {
    console.log('========');
    fastify.log.info({job, result});
});

// Declare a route
fastify.get('/', async function(request, reply) {
    // Test processing
    const imageUrl = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg';
    for (let i = 0; i < 100; i++) {
        queue.add({imageUrl, meta: 'test meta'});
    }
    return 'ok';
});

// Run the server!
fastify.listen(3000, (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`);
});
