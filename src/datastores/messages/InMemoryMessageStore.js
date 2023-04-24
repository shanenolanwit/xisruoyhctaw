module.exports = class InMemoryMessageStore {
    constructor() {
        this.messageList = [];
    }
    
    async getMessages() {
        return messageList;
    }

    async addMessage(msg, name, room) {
        this.messageList.push(msg);
    }
    
    async setMessages(messages) {
        this.messageList = value;
    }
}