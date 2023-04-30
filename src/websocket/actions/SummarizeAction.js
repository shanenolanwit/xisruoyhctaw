module.exports = class MessageAction {
    static async execute(dependencyManager, ws) {
        const socketTracker = dependencyManager.getSocketTracker();
        const participant = socketTracker.getParticipant(ws);
        const store = dependencyManager.getStore();
        if (participant){
            const { room } = participant;
            const roomMessages = await store.getMessagesForRoom(room);
            const simplifiedMessages = roomMessages.map((message) => {
                return `${message.name}: ${message.text}`
            });
            const text = simplifiedMessages.join("\n");
            const summarizer = dependencyManager.getSummarizer();
            const summary = await summarizer.summarize(text);
            ws.send(summary);
        } else {
            ws.send(`use /join <room> to join a room`);
        }
       
    }
}