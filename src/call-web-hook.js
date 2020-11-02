const fetch = require('node-fetch');
// const {URLSearchParams} = require('url');

module.exports = (webHook, params) => {
    // @TODO add url validation
    console.log('webHookFetch1: ', `${webHook}`, params);
    const query = new URLSearchParams(params);
    console.log('webHookFetch: ', `${webHook}?${query}`);
    fetch(`${webHook}?${query}`);
};
//
