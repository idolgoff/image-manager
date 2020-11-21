const build = require('../../app');

const imageUrl = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg';
const imageBadUrl = 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpe';

const goodPayload = {
    imageUrl,
};

const goodItemsPayload = {
    items: [
        {imageUrls: [imageUrl]},
        {imageUrls: [imageUrl]},
    ],
};

const mixedItemsPayload = {
    items: [
        {imageUrls: [imageBadUrl]},
        {imageUrls: [imageUrl]},
    ],
};

const notFoundPayload = {
    imageUrl: imageBadUrl,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('test service api', () => {
    let app;

    // eslint-disable-next-line jest/no-hooks
    beforeAll(() => {
        app = build();
    });

    describe('request GET /', () => {
        it('should return {ok: true}', async () => {
            expect.assertions(2);

            const response = await app.inject({
                method: 'GET',
                url: '/',
            });

            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual('{"ok":true}');
        });
    });

    describe('reuest POST /v1/queue/image', () => {
        it('should return 400 if missing params', async () => {
            expect.assertions(1);
            expect((await app.inject({
                method: 'POST',
                url: '/v1/queue/image',
            })).statusCode).toBe(400);
        });

        it('should return 200 params are ok', async () => {
            expect.assertions(2);
            const response = await app.inject({
                method: 'POST',
                url: '/v1/queue/image',
                payload: goodPayload,
            });
            expect(response.statusCode).toBe(200);
            expect(response.json()).toHaveProperty('jobId');
        });
    });

    describe('request GET /v1/queue/image', () => {
        it('should register job and return its status with payload', async () => {
            expect.assertions(3);
            const responsePost = await app.inject({
                method: 'POST',
                url: '/v1/queue/image',
                payload: goodPayload,
            });
            expect(responsePost.statusCode).toBe(200);
            const {jobId} = responsePost.json();

            await delay(2000);

            const responseGet = (await app.inject({
                method: 'GET',
                url: '/v1/queue/image',
                query: {jobId},
            })).json();

            expect(responseGet).toHaveProperty('result');
            expect(responseGet).toHaveProperty('payload');
        });

        it('should register job and return its status', async () => {
            expect.assertions(3);
            const response = await app.inject({
                method: 'POST',
                url: '/v1/queue/image',
                payload: notFoundPayload,
            });
            expect(response.statusCode).toBe(200);
            const {jobId} = response.json();

            await delay(2000);

            const responseGet = (await app.inject({
                method: 'GET',
                url: '/v1/queue/image',
                query: {jobId},
            })).json();

            expect(responseGet).toHaveProperty('result', 'failed');
            expect(responseGet).toHaveProperty('reason', 'Not Found');
        });
    });

    describe('request POST /v1/queue/items', () => {
        it('should return 400 if missing params', async () => {
            expect.assertions(1);
            expect((await app.inject({
                method: 'POST',
                url: '/v1/queue/items',
            })).statusCode).toBe(400);
        });

        it('should return 200 params are ok', async () => {
            expect.assertions(2);
            const response = await app.inject({
                method: 'POST',
                url: '/v1/queue/items',
                payload: {
                    items: [{
                        imageUrls: ['https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg'],
                    }],
                },
            });
            expect(response.statusCode).toBe(200);
            expect(response.json()).toHaveProperty('jobId');
        });

        it('should register job and return its status with payload', async () => {
            expect.assertions(3);
            const responsePost = await app.inject({
                method: 'POST',
                url: '/v1/queue/items',
                payload: goodItemsPayload,
            });
            expect(responsePost.statusCode).toBe(200);
            const {jobId} = responsePost.json();

            await delay(3000);

            const responseGet = (await app.inject({
                method: 'GET',
                url: '/v1/queue/items',
                query: {jobId},
            })).json();

            expect(responseGet).toHaveProperty('result');
            expect(responseGet).toHaveProperty('payload');
        });

        it('should return its status with payload even if some image failed', async () => {
            expect.assertions(3);
            const responsePost = await app.inject({
                method: 'POST',
                url: '/v1/queue/items',
                payload: mixedItemsPayload,
            });
            expect(responsePost.statusCode).toBe(200);
            const {jobId} = responsePost.json();

            await delay(3000);

            const responseGet = (await app.inject({
                method: 'GET',
                url: '/v1/queue/items',
                query: {jobId},
            })).json();

            expect(responseGet).toHaveProperty('result');
            expect(responseGet).toHaveProperty('payload');
        });
    });
});
