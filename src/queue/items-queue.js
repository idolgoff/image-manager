const {queueFactory} = require('./queue-factory');
const {addItems} = require('../process');

const addItemsProcessor = async function(job) {
    return addItems(job);
};

const itemsQueue = queueFactory('items-queue');
itemsQueue.registerProcessor({
    jobType: 'add',
    processor: addItemsProcessor,
});

module.exports = {
    itemsQueue,
};
