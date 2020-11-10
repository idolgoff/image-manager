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

describe('Job items queues', () => {
    describe('Items add', () => {
        it('Should return Promise with undefined jobId', async () => {
            const addJob = itemsQueue.add(jobData);
            await expect(addJob).resolves.toHaveProperty('opts.jobId', undefined);
            await expect(addJob).resolves.toHaveProperty('id');
        });

        it('Should return Promise with custom jobId', async () => {
            const jobId = uuid();
            const addJob = itemsQueue.add(jobData, jobId);
            await expect(addJob).resolves.toHaveProperty('id', jobId);
        });
    });

    describe('Items get', () => {
        it('Should throw Wrong job params error and be failed', async () => {
            const jobId = uuid();
            const wrongJobData = {};
            await itemsQueue.add(wrongJobData, jobId);

            await expect(itemsQueue.getJobFinished(jobId))
                .rejects
                .toThrowError('Wrong job params');

            const jobState = await itemsQueue.getJobState(jobId);
            expect(jobState).toBe('failed');
        });
    });
});
