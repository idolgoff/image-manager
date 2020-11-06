const {promisify} = require('util');
const fs = require('fs');

const saveFile = promisify(fs.writeFile);

module.exports = async (fileBuffer, fullFilename) => {
    return saveFile(fullFilename, fileBuffer);
};
