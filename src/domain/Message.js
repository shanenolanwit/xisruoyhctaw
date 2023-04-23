
module.exports = class Message {
    constructor({timestamp, name, text}) {
        this.timestamp = timestamp;
        this.name = name;
        this.text = text;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.text;
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
        return {
            timestamp: this.timestamp,
            name: this.name,
            text: this.text
        };
    }
}