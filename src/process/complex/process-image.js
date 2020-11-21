const {v4: uuidv4} = require('uuid');

const {download, manipulate, store} = require('../units');
const {sets, mainDir} = require('../../config');

const processImage = async (imageUrl) => {
    // Download file
    const file = await download(imageUrl);
    const filename = `${uuidv4()}.jpg`;

    const paths = await Promise.all(sets.map(async ({size, subPath}) => {
        // Process
        const processedJpeg = await manipulate(file, size);
        const path = `${mainDir}/${subPath}/${filename}`;

        // Store
        await store(processedJpeg, path);

        // Return new path
        return `${subPath}/${filename}`;
    }));

    return {paths, filename};
};

module.exports = {
    processImage,
};
