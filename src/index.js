// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true,
});
const process = require('./process');

// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({hello: 'world!'});
});


// Test processing
image = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg';
process(image);


// Run the server!
fastify.listen(3000, (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`);
});
