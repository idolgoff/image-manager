const Queue = require('bull');

const processing = require('../processing');
const {redis} = require('../config');

const _queue = new Queue('main-queue', {redis});

// Queue consumer
_queue.process(async (job) => processing(job.data));

/**
 * @callback jobCompleteCallback
 * @param {job} jobPointer
 * @param {result} responseMessage
 */

const queue = {
    // Queue producer
    /**
     * @param {{imageUrls, meta}} jobData
     */
    add: async (jobData) => _queue.add(jobData),

    /**
     * @param {jobCompleteCallback} cb
     */
    onComplete: (cb) => {
        _queue.on('completed', cb);
    },
};

module.exports = queue;
