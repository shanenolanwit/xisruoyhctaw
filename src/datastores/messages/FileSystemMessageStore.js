const Message = require("../../domain/Message");

module.exports = class FilesystemMessageStore {
    constructor({path, fs }) {
        this.path = path
        this.fs = fs;
    }

    async touch(){
        try {
            await this.fs.access(this.path, 0);
          } catch (err) {
            const parts = this.path.split('/');
            parts.pop();
            const directory = parts.join('/');
            this.fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) throw err;
            });
            try {
                await this.fs.writeFile(this.path, "[]");
            } catch (err) {
                console.error('Error writing to file:', err);
            }
          }
    }
    
    async getMessages() {
        await this.touch()
        const messageList = []
        try {
            const data = await this.fs.readFile(this.path);
            const messages = JSON.parse(data);
            messages.forEach((msgData) => {
                messageList.push(msgData);
            })
            return messageList;
        } catch (err) {
            console.error('File read failed:', err);
            return messageList;
        }
    }

    async addMessage(message) {
        const messageList = await this.getMessages();
        messageList.push(message.serialize());
        await this.setMessages(messageList);
    }
    
    async setMessages(data) {
        await this.touch()
        try {
          await this.fs.writeFile(this.path, JSON.stringify(data));
        } catch (err) {
          console.error('File write failed:', err);
        }
      } 
}