const Message = require('./Message');

module.exports = class MessageParser {
    static deserialize(data) {
        const json_data = JSON.parse(data);
        return new Message(json_data);
    }
}
