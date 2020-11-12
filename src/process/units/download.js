const fetch = require('node-fetch');

module.exports = async (filename) => {
    const response = await fetch(filename);
    if (response.status !== 200) throw new Error(response.statusText);
    const file = await response.buffer();
    return file;
};
