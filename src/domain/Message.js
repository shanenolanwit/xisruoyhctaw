
module.exports = class Message {
    constructor({timestamp, text}) {
        this.timestamp = timestamp;
        this.text = text;
        this.name = ""
        this.roopm = ""
    }

    getTimestamp() {
        return this.timestamp;
    }

    getText() {
        return this.text;
    }

    setName(name) {
        this.name = name
    }

    setRoom(room) {
        this.room = room
    }

    isCommand() {
        return this.text.startsWith('/');
    }

    getTextWithoutCommand() {
        return this.text.split(' ').slice(1).join(' ');
    }

    toString() {
        return `timestamp: ${this.timestamp}, msg: ${this.text}`;
    }

    serialize() {
        console.log("serializing message")
        console.log({
            timestamp: this.timestamp,
            text: this.text,
            name: this.name,
            room: this.room
        })
        return {
            timestamp: this.timestamp,
            text: this.text,
            name: this.name,
            room: this.room
        };
    }
}