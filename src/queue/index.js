const processing = require('../processing');

/**
 * @callback jobCompleteCallback
 * @param {job} jobPointer
 * @param {result} responseMessage
 */

const queueFactory = (_queue) => {
    // Queue consumer
    _queue.process(async (job) => processing(job.data));

    return ({
        // Queue producer
        /**
         * @param {{imageUrl, meta}} jobData
         * @param {string} jobId
         */
        add: async (jobData, jobId) => _queue.add(jobData, {jobId}),
        getStat: async () => _queue.getJobCounts(),
        getJobStatus: async (jobId) => _queue.getJob(jobId),
        getJobProgress: async (jobId) => _queue.getJob(jobId),

        /**
         * @param {jobCompleteCallback} cb
         */
        onComplete: (cb) => {
            _queue.on('completed', cb);
        },
    });
};

const imageQueue = queueFactory(require('./image'));
const imagesQueue = queueFactory(require('./images'));

module.exports = {
    imageQueue,
    imagesQueue,
};
