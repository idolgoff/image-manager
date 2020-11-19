const build = require('../../app');

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
                payload: {
                    imageUrl: 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
                    webHook: '/test-webhook',
                },
            });
            expect(response.statusCode).toBe(200);
            expect(response.json()).toHaveProperty('jobId');
        });
    });

    describe('request GET /v1/queue/image', () => {
        it('should register job and return its status', async () => {
            expect.assertions(2);
            const response = await app.inject({
                method: 'POST',
                url: '/v1/queue/image',
                payload: {
                    imageUrl: 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg',
                    webHook: '/test-webhook',
                },
            });
            expect(response.statusCode).toBe(200);

            const jobId = response.json()['jobId'];
            const responseGet = await app.inject({
                method: 'GET',
                url: '/v1/queue/image',
                query: {jobId},
            });

            console.log(responseGet);
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
    });
});
