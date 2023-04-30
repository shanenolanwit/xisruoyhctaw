module.exports = class MessageAction {
    static async execute(dependencyManager, ws, msg) {
        const socketTracker = dependencyManager.getSocketTracker();
        const participant = socketTracker.getParticipant(ws);
        const store = dependencyManager.getStore();
        if (participant){
            const { room, name } = participant;
            await store.addMessage(msg, name, room);
            const roomParticipants = socketTracker.getRoomParticipants(room);
            
            roomParticipants.forEach((ws) => {
                ws.send(`${participant.name}: ${msg.getTextWithoutCommand()}`);
            });
        } else {
            ws.send(`use /join <room> to join a room`);
        }
       
    }
}