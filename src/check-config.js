const config = require('./config');

const genConfigError = (reason) => {
    throw new Error(`Configuration error: ${reason}`);
};

module.exports = (() => {
    console.log('HERE');
    if (!config.mainDir) genConfigError('mainDir isn\'t set');
    if (config.mainDir.match(/\/$/)) genConfigError('No trailing slash in mainDir');
    if (config.tmpDir && config.tmpDir.match(/\/$/)) genConfigError('No trailing slash in tmpDir');
    if (!config.sets || !config.sets.length) genConfigError('sets section is miscofigured');
    config.sets.forEach((set, i) => {
        if (!set.type) genConfigError(`Sets[${i}] type isn't set`);
        if (!set.subPath) genConfigError(`Sets[${i}] subPath isn't set, set type '${set.type}'`);
        if (set.subPath.match(/\/$/)) genConfigError(`No trailing slash in subPath: '${set.type}'`);
    });
})();
