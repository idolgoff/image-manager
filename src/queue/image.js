const Queue = require('bull');
const {redis} = require('../config');

const queue = new Queue('image-queue', {redis});

module.exports = queue;
