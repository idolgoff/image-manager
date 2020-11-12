const {v4: uuid} = require('uuid');

const {itemsQueue} = require('../../../queue');
const callWebHook = require('../../../call-web-hook');

itemsQueue.onComplete((job, result) => {
    const {webHook} = job.data;
    if (webHook) callWebHook(webHook, result);
});

const item = {
    type: 'object',
    // properties: {
    //     id: 'string',
    //     imageUrls: {
    //         type: 'array',
    //         items: {type: 'string'},
    //     },
    // },
};

const postImagesSchema = {
    body: {
        type: 'object',
        required: ['items'],
        properties: {
            items: {
                type: 'array',
                items: item,
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
    itemsQueue.add(req.body, jobId);
    res.send({jobId});
};

const handleGetItem = function(req, res) {};

module.exports = function(fastify, opts, done) {
    fastify.post('/items', {schema: postImagesSchema}, handlePostImages);
    fastify.get('/items', handleGetItem);
    done();
};
