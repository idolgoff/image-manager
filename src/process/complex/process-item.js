const {processImage} = require('./process-image');

const processItem = async (item) => {
    item.processed = await Promise.allSettled(item.imageUrls.map((imageUrl) => {
        try {
            return processImage(imageUrl);
        } catch (err) {
            // Should through something serializeble
            throw err.message;
        }
    }));
    return item;
};

module.exports = {
    processItem,
};
