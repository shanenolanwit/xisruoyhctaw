module.exports = class FilesystemStore {
    constructor({ path, fs }) {
        this.path = path;
        this.fs = fs;
        this.fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
        this.fs.open(`${this.path}/messages.json`, 'w', (err, fd) => {
            if (err) throw err;
        });

    }
    
    async getMessages() {
        const data = this.fs.readFileSync(`${this.path}/messages.json`);
        const messageList = []
        try{
            const messages = JSON.parse(data);
            messages.forEach((msgData) => {
               messageList.push(new Message(msgData));
            })
        } catch (e) {
            console.log("no data")
        }
       
        return messageList;
    }

    async addMessage(message) {
        const messageList = await this.getMessages()
        messageList.push(message);
        await this.set(messageList);
    }
    
    async set(value) {
        await this.fs.writeFileSync(`${this.path}/messages.json`, JSON.stringify(value));
    }
}