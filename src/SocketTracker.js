

module.exports = class SocketTracker {

    constructor() {
        this.participants = new Map();
    }

    getParticipants() {
        return this.participants;
    }

    addParticipant(ws, room, name) {
        this.participants.set(ws, {room, name});
    }

    removeParticipant(ws) {
        this.participants.delete(ws);
    }

    getRoomParticipants(room) {
        return Array.from(this.participants.keys()).filter((ws) => {
            const metadata = this.participants.get(ws);
            return metadata.room == room;
        });
    }

    getParticipant(ws) {
        return this.participants.get(ws);
    }

    getParticipantRoom(ws) {
        return this.participants.get(ws).room;
    }

    getParticipantName(ws) {
        return this.participants.get(ws).name;
    }
}