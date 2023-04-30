const assert = require('assert');

module.exports = class Environment {
    constructor() {
        this.messageStoreType = process.env.MESSAGE_STORE_TYPE || 'in-memory';
        if (this.messageStoreType === 'file') {
            const messageStorePath = process.env.MESSAGE_STORE_PATH;
            assert.notStrictEqual(messageStorePath, undefined, `Storage set to file but MESSAGE_STORE_PATH is not set`);
            this.messageStorePath = messageStorePath;
        }
        this.openAIModel = process.env.OPEN_AI_MODEL || 'text-davinci-002';
        this.openAIApiKey = process.env.OPEN_AI_API_KEY;
        this.openAIAvailable = this.openAIApiKey !== undefined;
    }

    getMessageStoreType() {
        return this.messageStoreType;
    }

    getMessageStorePath() {
        return this.messageStorePath;
    }

    getOpenAIModel() {
        return this.openAIModel;
    }

    getOpenAIApiKey() {
        return this.openAIApiKey;
    }

    isOpenAIAvailable() {
        return this.openAIAvailable;
    }
}




