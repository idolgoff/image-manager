const Queue = require('bull');
const {redis} = require('../config');

const queue = new Queue('images-queue', {redis});

module.exports = queue;
