module.exports = class MessageAction {
    static async execute(dependencyManager, store, ws, msg) {
        const socketTracker = dependencyManager.getSocketTracker();
        const participant = socketTracker.getParticipant(ws);
        const { room, name } = participant;
        await store.addMessage(msg);
        const roomParticipants = socketTracker.getRoomParticipants(room);
        
        roomParticipants.forEach((ws) => {
            ws.send(`${participant.name}: ${msg.getTextWithoutCommand()}`);
        });
    }
}