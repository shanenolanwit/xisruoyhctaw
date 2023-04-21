const fs = require('fs');
const WebSocketServer = require('ws').Server
const InMemoryStore = require('./InMemoryStore');
const SocketTracker = require('./SocketTracker');
const MessageParser = require('./MessageParser');

module.exports = class DependencyManager {
    constructor() {
        this.wss = new WebSocketServer({port: 8080});
        this.store = new InMemoryStore();
        this.socketTracker = new SocketTracker();
    }

    getWebSocketServer() {
        return this.wss;
    }

    getFileSystem(){
        return fs;
    }

    getStore(){
        return this.store;
    }

    getSocketTracker(){
        return this.socketTracker;
    }

    getMessageParser(){
        return MessageParser;
    }

   
}