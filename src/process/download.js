// const fs = require('fs');
const fetch = require('node-fetch');

module.exports = async (filename) => {
    const response = await fetch(filename);
    const file = await response.buffer();

    // fs.writeFile('source.jpeg', file, (err) => {
    //     console.error(err);
    // });

    return file;
};
