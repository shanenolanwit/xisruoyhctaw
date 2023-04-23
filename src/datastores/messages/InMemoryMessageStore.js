module.exports = class InMemoryMessageStore {
    constructor() {
        this.messageList = [];
    }
    
    async getMessages() {
        return messageList;
    }

    async addMessage(message) {
        this.messageList.push(message);
    }
    
    async setMessages(messages) {
        this.messageList = value;
    }
}