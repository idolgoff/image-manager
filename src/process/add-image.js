const {processImage} = require('./complex/process-image');

const addImage = async ({data}) => {
    if (typeof data !== 'object' || !data.imageUrl) {
        return Promise.reject(new Error('Wrong job params'));
    }

    const {imageUrl} = data;
    const {paths, filename} = await processImage(imageUrl);

    return Promise.resolve({
        ...data,
        filename,
        paths,
    });
};

module.exports = {
    addImage,
};
