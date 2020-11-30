const fetch = require('node-fetch');

module.exports = (webHook, params) => {
    fetch(webHook, {
        method: 'POST',
        body: JSON.stringify(params),
    });
};
