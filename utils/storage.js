const { Storage } = require('@google-cloud/storage');

module.exports.Storage = Storage;
module.exports.storage = new Storage();
