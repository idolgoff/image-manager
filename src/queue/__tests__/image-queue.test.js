const {v4: uuid} = require('uuid');
const {imageQueue} = require('../index');
const jobPossibleStates = [
    'completed', 'failed', 'delayed', 'active', 'waiting', 'paused', 'stuck', 'null',
];

const wrongFormatUrl = 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt';
const jobData = {
    imageUrl: 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
    meta: {
        'a': true,
        'b': false,
    },
};


describe('job image queues', () => {
    // eslint-disable-next-line jest/no-hooks
    beforeAll(async () => {
        // Clear all jobs
        await imageQueue.clean();
    });

    describe('image add', () => {
        it('should return Promise with undefined jobId', async () => {
            expect.assertions(2);
            const addJob = imageQueue.add(jobData);
            await expect(addJob).resolves.toHaveProperty('opts.jobId', undefined);
            await expect(addJob).resolves.toHaveProperty('id');
        });

        it('should return Promise with custom jobId', async () => {
            expect.assertions(2);
            const jobId = uuid();
            const addJob = imageQueue.add(jobData, jobId);
            await expect(addJob).resolves.toHaveProperty('id', jobId);
        });
    });

    describe('image get', () => {
        it('should return job state by jobId', async () => {
            expect.assertions(1);
            const jobId = uuid();
            await imageQueue.add(jobData, jobId);
            const jobState = await imageQueue.getJobState(jobId);
            expect(jobPossibleStates).toContain(jobState);
        });

        it('should return job progress by jobId', async () => {
            expect.assertions(2);
            const jobId = uuid();
            await imageQueue.add(jobData, jobId);

            const jobProgress = await imageQueue.getJobProgress(jobId);
            expect(jobProgress).toBeGreaterThanOrEqual(0);
            expect(jobProgress).toBeLessThanOrEqual(100);
        });

        it('should resolve with data processed', async () => {
            expect.assertions(3);
            const jobId = uuid();
            await imageQueue.add(jobData, jobId);

            const result = await imageQueue.getJobFinished(jobId);

            expect(result).toHaveProperty('filename');
            expect(result.filename).not.toHaveLength(0);

            const jobState = await imageQueue.getJobState(jobId);
            expect(jobState).toBe('completed');
        });

        it('should throw Wrong job params error and be failed', async () => {
            expect.assertions(2);
            const jobId = uuid();
            const wrongJobData = {};
            await imageQueue.add(wrongJobData, jobId);

            await expect(imageQueue.getJobFinished(jobId))
                .rejects
                .toThrow('Wrong job params');

            const jobState = await imageQueue.getJobState(jobId);
            expect(jobState).toBe('failed');
        });

        it('should throw Not found error', async () => {
            expect.assertions(1);

            const jobId = uuid();
            const wrongJobData = {imageUrl: 'http://ya.ru/404'};
            await imageQueue.add(wrongJobData, jobId);

            await expect(imageQueue.getJobFinished(jobId)).rejects.toThrow('Not Found');
        });

        it('should throw Input buffer contains unsupported image format error', async () => {
            expect.assertions(1);

            const jobId = uuid();
            const imageUrl = wrongFormatUrl;
            const wrongJobData = {imageUrl};
            await imageQueue.add(wrongJobData, jobId);

            await expect(imageQueue.getJobFinished(jobId))
                .rejects
                .toThrow('Input buffer contains unsupported image format');
        });
    });
});
