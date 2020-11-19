const Queue = require('bull');

const {redis} = require('../config');

/**
 * @callback jobCompleteCallback
 * @param {object} job
 * @param {string} result
 */

/**
 * @callback jobProgressCallback
 * @param {string} jobId
 * @param {number} progress 0..1
 */

const queueFactory = (queueType = 'common-queue') => {
    const queue = new Queue(queueType, {redis});

    return ({
        // Queue producers
        /**
         * add producers
         * @param {{imageUrl, meta, webHook}} jobAddData
         * @param {string} jobId
         */
        add: async (jobAddData, jobId) => {
            const res = await queue.add('add', jobAddData, {jobId});
            return res;
        },
        // delete: async (jobData, jobId) => queue.add('delete', jobData, {jobId}),
        // copy: async (jobData, jobId) => queue.add('copy', jobData, {jobId}),

        // Queue consumer
        registerProcessor: ({jobType, processor}) => {
            queue.process(jobType, processor);
        },

        getStatistic: async () => queue.getJobCounts(),

        /**
         * Returns jobs state
         * @param {string} jobId
         * @return {Promise}
         * Possible returns are: completed, failed, delayed, active, waiting, paused, stuck or null.
         */
        getJobState: async (jobId) => {
            const job = await queue.getJob(jobId);
            return job.getState();
        },
        getJobProgress: async (jobId) => {
            const job = await queue.getJob(jobId);
            return job.progress();
        },
        getJobFinished: async (jobId) => {
            const job = await queue.getJob(jobId);
            return job.finished();
        },
        getJobFailedReason: async (jobId) => {
            const job = await queue.getJob(jobId);
            return job.failedReason || '';
        },

        /**
         * Clean queue
         * https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean
         * @param {*} params
         */
        async clean() {
            const states = ['delayed', 'wait', 'active', 'completed', 'failed'];
            return await Promise.all(states.map((state) => queue.clean(10, state)));
        },

        /**
         * @param {jobCompleteCallback} cb
         */
        onComplete: (cb) => {
            queue.on('completed', cb);
        },

        /**
         * @param {jobProgressCallback} cb
         */
        onProgress: (cb) => {
            queue.on('progress', cb);
        },
    });
};


module.exports = {
    queueFactory,
};
