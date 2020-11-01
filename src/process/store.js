const {promisify} = require('util');
const fs = require('fs');

const saveFile = promisify(fs.writeFile);

module.exports = async (fileBuffer, fullFilename) => {
    console.log(fileBuffer);
    return saveFile(fullFilename, fileBuffer);
};
