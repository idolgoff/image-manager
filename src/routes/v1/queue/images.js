const {v4: uuid} = require('uuid');

const {imagesQueue} = require('../../../queue');
const callWebHook = require('../../../call-web-hook');

imagesQueue.onComplete((job, result) => {
    const {webHook} = job.data;
    if (webHook) callWebHook(webHook, result);
});

const postImagesSchema = {
    body: {
        type: 'object',
        required: ['imageUrls'],
        properties: {
            imageUrls: {
                type: 'array',
                items: {type: 'string'},
            },
            meta: {type: ['string', 'object']},
            webHook: {type: 'string'},
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                jobId: {type: 'string'},
            },
        },
    },
};

const handlePostImages = function(req, res) {
    const jobId = uuid();
    imagesQueue.add(req.body, jobId);
    res.send({jobId});
};

const handleGetItem = function(req, res) {};

module.exports = function(fastify, opts, done) {
    fastify.post('/images', {schema: postImagesSchema}, handlePostImages);
    fastify.get('/images', handleGetItem);
    done();
};
