

module.exports = class MessageDecorator {
    static decorate(msg, name, room) {
        msg.setName(name)
        msg.setRoom(room)
        return msg
    }
}
