module.exports = class TypingAction {
    static async execute(dependencyManager, ws, action) {
        const socketTracker = dependencyManager.getSocketTracker();
        const participant = socketTracker.getParticipant(ws);
        const { name, room } = participant;
        const roomParticipants = socketTracker.getRoomParticipants(room);
        roomParticipants.forEach((ws) => {
            ws.send(`${name} has ${action} typing`);
        });
    }
}
