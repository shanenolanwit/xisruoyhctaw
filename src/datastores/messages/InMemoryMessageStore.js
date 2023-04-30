const MessageDecorator = require("../../utils/MessageDecorator");

module.exports = class InMemoryMessageStore {
    constructor() {
        this.messageList = [];
    }
    
    async getMessages() {
        return this.messageList;
    }

    async addMessage(msg, name, room) {
        const messageList = await this.getMessages();
        const message = MessageDecorator.decorate(msg, name, room);
        messageList.push(message.serialize());
        return this.setMessages(messageList);
    }
    
    async setMessages(messages) {
        this.messageList = messages;
    }


    async getMessagesForRoom(room) {
        const messageList = await this.getMessages();
        const messagesForRoom = messageList.filter((msg) => {
            return msg.room === room;
        });
        // order the messages by timestamp from oldest to newest
        messagesForRoom.sort((a, b) => {
            return a.timestamp - b.timestamp;
        });
        return messagesForRoom;
    }
}