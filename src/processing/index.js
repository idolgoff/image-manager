const {v4: uuidv4} = require('uuid');

const download = require('./download');
const manipulate = require('./manipulate');
const store = require('./store');

const config = require('../config');

module.exports = async (data) => {
    if (typeof data !== 'object' || !data.imageUrl) {
        return Promise.reject(new Error('Wrong job params'));
    }

    const {imageUrl} = data;
    const {sets, mainDir} = config;

    // Download file
    const file = await download(imageUrl);
    const filename = `${uuidv4()}.jpg`;

    return Promise.all(sets.map(async ({size, subPath}) => {
        // Process
        const processedJpeg = await manipulate(file, size);
        const path = `${mainDir}/${subPath}/${filename}`;

        // Store
        await store(processedJpeg, path);

        // Return object
        return {...data, path, filename};
    }));
};
