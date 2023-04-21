const DependencyManager = require('./DependencyManager');

const dependencyManager = new DependencyManager();

const wss = dependencyManager.getWebSocketServer();
const socketTracker = dependencyManager.getSocketTracker();
const MessageParser = dependencyManager.getMessageParser();
const SocketMessageTypes = require('./SocketMessageTypes')

class JoinAction {
    static execute(deps, ws, name, room) {
        const roomParticipants = socketTracker.getRoomParticipants(room);
        roomParticipants.forEach((ws) => {
            ws.send(`new participant: ${name}`);
        });
        socketTracker.addParticipant(ws,room, name);
    }
}

class MessageAction {
    static execute(deps, ws, msg) {
        const store = deps.getStore();
        store.addMessage(msg);
        const participant = socketTracker.getParticipant(ws);
        const room = socketTracker.getParticipantRoom(ws);
        const roomParticipants = socketTracker.getRoomParticipants(room);
        console.log("room participants: " + roomParticipants)
        roomParticipants.forEach((ws) => {
            ws.send(`${participant.name}: ${msg}`);
        });
    }
}

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        msg = MessageParser.deserialize(message);
        if(msg.getType() == SocketMessageTypes.COMMAND) {
            if(msg.getText().startsWith('/join')) {
                JoinAction.execute(dependencyManager, ws, msg.getName(), msg.getTextWithoutCommand());
            } else if(msg.getText().startsWith('/msg')) {
                console.log("got a message at least")
                MessageAction.execute(dependencyManager, ws, msg.getTextWithoutCommand());
            }
        } else {
            ws.send("invalid message type");
        }
    });
   
});



