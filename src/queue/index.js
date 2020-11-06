const {add} = require('../process');

/**
 * @callback jobCompleteCallback
 * @param {job} jobPointer
 * @param {result} responseMessage
 */

const addProcessor = async (job) => add(job.data);

const queueFactory = (_queue) => {
    // Queue consumer
    _queue.process('add', addProcessor);

    return ({
        // Queue producers
        /**
         * add producers
         * @param {{imageUrl, meta, webHook}} jobAddData
         * @param {string} jobId
         */
        add: async (jobAddData, jobId) => _queue.add('add', jobAddData, {jobId}),
        // delete: async (jobData, jobId) => _queue.add('delete', jobData, {jobId}),
        // copy: async (jobData, jobId) => _queue.add('copy', jobData, {jobId}),

        getStatistic: async () => _queue.getJobCounts(),

        /**
         * Returns jobs state
         * @param {string} jobId
         * @return {Promise}
         * Possible returns are: completed, failed, delayed, active, waiting, paused, stuck or null.
         */
        getJobState: async (jobId) => {
            const job = await _queue.getJob(jobId);
            return job.getState();
        },
        getJobProgress: async (jobId) => {
            const job = await _queue.getJob(jobId);
            return job.progress();
        },
        getJobFinished: async (jobId) => {
            const job = await _queue.getJob(jobId);
            return job.finished();
        },

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
