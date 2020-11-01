// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true,
});
require('./check-config');
const processing = require('./processing');

// Declare a route
fastify.get('/', async function(request, reply) {
    // Test processing
    const image = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg';
    try {
        console.log('1');
        await processing(image);
        console.log('2');
    } catch (err) {
        this.log.error(err);
        throw new Error(err);
    }
    reply.send({hello: 'world!'});
});

// Run the server!
fastify.listen(3000, (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`);
});
