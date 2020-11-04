const handlePostImages = function(req, res) {};

const handleGetItem = function(req, res) {};

module.exports = function(fastify, opts, done) {
    fastify.post('/item', handlePostImages);
    fastify.get('/item', handleGetItem);
    done();
};
