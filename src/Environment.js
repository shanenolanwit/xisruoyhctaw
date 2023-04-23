const assert = require('assert');

module.exports = class Environment {
    constructor() {
        this.messageStoreType = process.env.MESSAGE_STORE_TYPE || 'in-memory';
        if (this.messageStoreType === 'file') {
            const messageStorePath = process.env.MESSAGE_STORE_PATH;
            assert.notStrictEqual(messageStorePath, undefined, `Storage set to file but MESSAGE_STORE_PATH is not set`);
            this.messageStorePath = messageStorePath;
        } 
    }

    getMessageStoreType() {
        return this.messageStoreType;
    }

    getMessageStorePath() {
        return this.messageStorePath;
    }
}




