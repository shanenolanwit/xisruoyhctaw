const MessageParser = require('../../utils/MessageParser');
const JoinAction = require('../actions/JoinAction');
const MessageAction = require('../actions/MessageAction');
const TypingAction = require('../actions/TypingAction');
const RegisterAction = require('../actions/RegisterAction');
const SummarizeAction = require('../actions/SummarizeAction');

module.exports = class WebSocketServerWrapper {
    async init(dependencyManager){
        const wss = dependencyManager.getWebSocketServer();
        wss.on('connection', async function(ws) {
            ws.on('message', async function(message) {
                const msg = MessageParser.deserialize(message);
                if(msg.isCommand()) {
                    if(msg.getText().startsWith('/register')) {
                        await RegisterAction.execute(dependencyManager, ws, msg);
                    } else if(msg.getText().startsWith('/join')) {
                        await JoinAction.execute(dependencyManager, ws, msg);
                    } else if(msg.getText().startsWith('/msg')) {
                        await MessageAction.execute(dependencyManager, ws, msg);
                    } else if(msg.getText().startsWith('/start')) {
                        await TypingAction.execute(dependencyManager, ws, "started");
                    } else if(msg.getText().startsWith('/stop')) {
                        await TypingAction.execute(dependencyManager, ws, "stopped");
                    }  else if(msg.getText().startsWith('/catchup')) {
                        await SummarizeAction.execute(dependencyManager, ws);
                    } 
                } else {
                    ws.send("invalid message type");
                }
            });
        
        });
    }
}
