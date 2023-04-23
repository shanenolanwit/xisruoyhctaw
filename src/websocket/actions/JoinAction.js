module.exports = class JoinAction {
    static async execute(dependencyManager, ws, name, msg) {
        const socketTracker = dependencyManager.getSocketTracker();
        const room = msg.getTextWithoutCommand()
        const roomParticipants = socketTracker.getRoomParticipants(room);
        roomParticipants.forEach((ws) => {
            ws.send(`new participant: ${name}`);
        });
        socketTracker.addParticipant(ws,room, name);
    }
}
