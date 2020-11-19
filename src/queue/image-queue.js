const {queueFactory} = require('./queue-factory');
const {addImage} = require('../process');

const addImageProcessor = function(job) {
    return addImage(job);
};

const imageQueue = queueFactory('image-queue');
imageQueue.registerProcessor({
    jobType: 'add',
    processor: addImageProcessor,
});

console.log('Import imageQueue');
module.exports = {
    imageQueue,
};
