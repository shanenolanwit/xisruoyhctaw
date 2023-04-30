module.exports = class FakeEnvironment {
    constructor(messageStoreType, messageStorePath, openAIModel, openAIApiKey) {
        this.messageStoreType = messageStoreType || 'in-memory';
        if (this.messageStoreType === 'file') {
            assert.notStrictEqual(messageStorePath, undefined, `Storage set to file but MESSAGE_STORE_PATH is not set`);
            this.messageStorePath = messageStorePath;
        }
        this.openAIModel =  openAIModel || 'text-davinci-002';
        this.openAIApiKey = openAIApiKey;
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




