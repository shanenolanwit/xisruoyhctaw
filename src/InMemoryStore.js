

module.exports = class InMemoryStore {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        return this.messages;
    }

    async addMessage(message) {
        this.messages.push(message);
    }
    
}