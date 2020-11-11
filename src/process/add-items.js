const {processItem} = require('./complex/process-item');

const getProgress = (arrReady, arrTotal) => Math.round(arrReady.length / arrTotal.length * 100);

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
