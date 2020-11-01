const sharp = require('sharp');

module.exports = async (file, size) => {
    return await sharp(file)
        .resize(size)
        .jpeg()
        .toBuffer();
};
