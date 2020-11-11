const {processImage} = require('./process-image');

const processItem = async (item) => {
    const processed = await Promise.all(item.imageUrls.map(async (imageUrl) => {
        return processImage(imageUrl);
    }));
    item.processed = processed;
    return item;
};

module.exports = {
    processItem,
};
