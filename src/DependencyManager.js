const fs = require('fs').promises;
const WebSocketServer = require('ws').Server
const FileSystemMessageStore = require('./datastores/messages/FileSystemMessageStore');
const InMemoryMessageStore = require('./datastores/messages/InMemoryMessageStore');
const SocketTracker = require('./websocket/utils/SocketTracker');

module.exports = class DependencyManager {
    constructor(environment) {
        this.environment = environment;
        this.wss = new WebSocketServer({port: 8080});
        this.socketTracker = new SocketTracker();

        const storeType = environment.getMessageStoreType();
        switch (storeType) {
            case 'file':
                const path = environment.getMessageStorePath();
                this.store = new FileSystemMessageStore( { path, fs } );
                return null
            default:
                this.store = new InMemoryMessageStore();
                return null;
        }
        
        
    }

    getEnvironment(){
        return this.environment;
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
}