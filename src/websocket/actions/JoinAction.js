module.exports = class JoinAction {
    static async execute(dependencyManager, ws, msg) {
        const socketTracker = dependencyManager.getSocketTracker();
        const newRoom = msg.getTextWithoutCommand()
        const participant = socketTracker.getParticipant(ws);

        const { name, room } = participant;
        
        const roomParticipants = socketTracker.getRoomParticipants(newRoom);
       
        // remove the participant from any other rooms
        socketTracker.removeParticipant(ws);
        // check if any participants are in the room
        if (roomParticipants.length === 0) {
            ws.send("looks like you're the first one here")
        } else {
            roomParticipants.forEach((ws) => {
                ws.send(`new participant: ${name}`);
            });
        }

        const oldRoomParticipants = socketTracker.getRoomParticipants(room);
        oldRoomParticipants.forEach((ws) => {
            ws.send(`${name} has left the room`);
        });

        socketTracker.addParticipant(ws, newRoom, name);
    }
}
