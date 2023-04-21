
module.exports = class Message {
    constructor({type, name, text}) {
        this.type = type;
        this.name = name;
        this.text = text;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.text;
    }

    getTextWithoutCommand() {
        return this.text.split(' ').slice(1).join(' ');
    }

    toString() {
        return `room: ${this.room}, msg: ${this.text}`;
    }
}