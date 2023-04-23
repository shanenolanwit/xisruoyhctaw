const MessageParser = require('../../utils/MessageParser');
const JoinAction = require('../actions/JoinAction');
const MessageAction = require('../actions/MessageAction');





module.exports = class WebSocketServerWrapper {
    async init(dependencyManager){
        const wss = dependencyManager.getWebSocketServer();
        const store = dependencyManager.getStore();
        wss.on('connection', async function(ws) {
            ws.on('message', async function(message) {
                const msg = MessageParser.deserialize(message);
                if(msg.isCommand()) {
                    if(msg.getText().startsWith('/join')) {
                        await JoinAction.execute(dependencyManager, ws, msg.getName(), msg);
                        // await this.join(ws, msg.getName(), msg);
                    } else if(msg.getText().startsWith('/msg')) {
                        await MessageAction.execute(dependencyManager, store, ws, msg);
                    }
                } else {
                    ws.send("invalid message type");
                }
            });
        
        });
    }
}
