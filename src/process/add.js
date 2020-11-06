const {v4: uuidv4} = require('uuid');

const {download, manipulate, store} = require('./steps');
const config = require('../config');

module.exports = async (data) => {
    if (typeof data !== 'object' || !data.imageUrl) {
        return Promise.reject(new Error('Wrong job params'));
    }

    const {imageUrl} = data;
    const {sets, mainDir} = config;

    // Download file
    let file;
    try {
        file = await download(imageUrl);
    } catch (err) {
        throw new Error(err);
    }
    const filename = `${uuidv4()}.jpg`;

    const paths = await Promise.all(sets.map(async ({size, subPath}) => {
        // Process
        const processedJpeg = await manipulate(file, size);
        const path = `${mainDir}/${subPath}/${filename}`;

        // Store
        await store(processedJpeg, path);

        // Return object
        return `${subPath}/${filename}`;
    }));

    return Promise.resolve({
        ...data,
        filename,
        paths,
    });
};
