const {v4: uuid} = require('uuid');

const {imageQueue} = require('../../../queue');
const callWebHook = require('../../../call-web-hook');

imageQueue.onComplete((job, result) => {
    const {webHook} = job.data;
    // console.log('Webhook called', result);
    if (webHook) callWebHook(webHook, result);
});

const postImageSchema = {
    body: {
        type: 'object',
        required: ['imageUrl'],
        properties: {
            imageUrl: {type: 'string'},
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

const handlePostImage = function(req, res) {
    const jobId = uuid();
    imageQueue.add(req.body, jobId);
    res.send({jobId});
};

const handleGetImage = async function(req, res) {
    const {jobId} = req.query;
    const result = await imageQueue.getJobState(jobId);
    if (result === 'failed') {
        const reason = await imageQueue.getJobFailedReason(jobId);
        res.send({result, reason});
    }
    res.send({result});
};

module.exports = function(fastify, opts, done) {
    fastify.post('/image', {schema: postImageSchema}, handlePostImage);
    fastify.get('/image', handleGetImage);
    done();
};
