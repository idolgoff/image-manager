const {v4: uuid} = require('uuid');
const {itemsQueue} = require('../index');

const jobData = {
    items: [{
        id: '0',
        imageUrls: [
            'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
            'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
        ],
    },
    {
        id: '1',
        imageUrls: [
            'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
            'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
        ],
    }],
    meta: {
        'a': true,
        'b': false,
    },
};


describe('job items queues', () => {
    // eslint-disable-next-line jest/no-hooks
    beforeAll(async () => {
        // Clear all jobs
        await itemsQueue.clean();
        itemsQueue.onProgress((jobId, progress) => {
            console.log('jobId: ', jobId, 'progress: ', progress * 100);
        });
    });

    describe('items add', () => {
        it('should return Promise with undefined jobId', async () => {
            expect.assertions(2);

            const addJob = itemsQueue.add(jobData);
            await expect(addJob).resolves.toHaveProperty('opts.jobId', undefined);
            await expect(addJob).resolves.toHaveProperty('id');
        });

        it('should return Promise with custom jobId', async () => {
            expect.assertions(1);

            const jobId = uuid();
            const addJob = itemsQueue.add(jobData, jobId);
            await expect(addJob).resolves.toHaveProperty('id', jobId);
        });
    });

    describe('items get', () => {
        it('should throw Wrong job params error and be failed', async () => {
            expect.assertions(2);

            const jobId = uuid();
            const wrongJobData = {};
            await itemsQueue.add(wrongJobData, jobId);

            await expect(itemsQueue.getJobFinished(jobId))
                .rejects
                .toThrow('Wrong addItems job params');

            const jobState = await itemsQueue.getJobState(jobId);
            expect(jobState).toBe('failed');
        });

        it('should contain same items number in response', async () => {
            expect.assertions(1);

            const jobId = uuid();
            await itemsQueue.add(jobData, jobId);

            const processed = await itemsQueue.getJobFinished(jobId);
            expect(processed).toHaveProperty('items');
        });
    });
});
