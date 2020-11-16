module.exports = {
    mainDir: process.env.MAIN_DIR,
    sets: [{
        type: 'thumb',
        subPath: 's',
        size: {
            width: 100,
        },
    }],
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
};
