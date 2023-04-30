module.exports = class RegisterAction {
    static async execute(dependencyManager, ws, msg) {
        const socketTracker = dependencyManager.getSocketTracker();
        const room = "lobby"
        const name = msg.getTextWithoutCommand()
        const roomParticipants = socketTracker.getRoomParticipants(room);
        // check if any participants in the room
        if (roomParticipants.length === 0) {
            ws.send("looks like you're the first one here")
        } else {
            roomParticipants.forEach((ws) => {
                ws.send(`new participant: ${name} has entered the ${room}`);
            });
        }
        socketTracker.addParticipant(ws, room, name);
    }
}
