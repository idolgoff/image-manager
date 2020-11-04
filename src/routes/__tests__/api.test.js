const build = require('../../app');

describe('Test service api', () => {
    let app;

    beforeEach(() => {
        app = build();
    });

    describe('GET /', () => {
        it('should return 404', async () => {
            expect.assertions(1);

            const response = await app.inject({
                method: 'GET',
                url: '/',
            });

            expect(response.statusCode).toBe(404);
        });
    });

    describe('POST /v1/queue/image', () => {
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
                    imageUrl: 'https://miro.medium.com/max/2880/1*Ar1k9HjU8Rhq1tqA6GEcdg.jpeg'
                    // imageUrl: 'http://ya.ru',
                },
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatch('jobId');
        });
    });
});
