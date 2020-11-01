const download = require('./download');
const manipulate = require('./manipulate');
const store = require('./store');

const {v4: uuidv4} = require('uuid');

const config = require('../config');

module.exports = async (image) => {
    const {sets, mainDir} = config;

    // Download file
    const file = await download(image);
    const filename = `${uuidv4()}.jpg`;

    return Promise.all(sets.map(async ({size, subPath}) => {
        // Process
        const processedJpeg = await manipulate(file, size);
        const path = `${mainDir}/${subPath}/${filename}`;

        // Store
        return store(processedJpeg, path);
    }));
};
