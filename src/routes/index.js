module.exports = {
    queue: {
        method: 'GET',
        url: '/queue',
        schema: null,
        handler: function(request, reply) {
            reply.send({hello: 'world'});
        },
    },
    images: {
        method: 'DELETE',
        url: '/images',
        schema: null,
        handler: function(request, reply) {
            reply.send({hello: 'world'});
        },
    },
};
