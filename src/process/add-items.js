const {v4: uuidv4} = require('uuid');

const {download, manipulate, store} = require('./units');
const config = require('../config');

const getProgress = (arrReady, arrTotal) => Math.round(arrReady.length / arrTotal * 100)

const processImage = (url) => {
    const {sets, mainDir} = config;

}

const processItem = async (item) => {

}

const addItems = async (job) => {
    const {data} = job;
    if (typeof data !== 'object' || !data.items || !data.items.length) {
        return Promise.reject(new Error('Wrong addItems job params'));
    }

    const {items} = data;
    const processedItems = [];

    // Process item by item setting jobs
    await Promise.all(items.map(async (item) => {
        const processedItem = await processItem(item);
        processedItems.push(processedItem);
        job.progress(getProgress(processedItems, data.items));
    }));

    return Promise.resolve({
        ...data,
        items: processedItems,
    });
};

module.exports = {
    addItems,
};
