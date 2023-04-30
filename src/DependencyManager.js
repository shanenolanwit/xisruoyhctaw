const fs = require('fs').promises;
const WebSocketServer = require('ws').Server
const { OpenAIApi, Configuration } = require('openai');
const FileSystemMessageStore = require('./datastores/messages/FileSystemMessageStore');
const InMemoryMessageStore = require('./datastores/messages/InMemoryMessageStore');
const SocketTracker = require('./websocket/utils/SocketTracker');
const Summarizer = require('./utils/Summarizer');

module.exports = class DependencyManager {
    constructor({environment}) {
        this.environment = environment;
        this.wss = new WebSocketServer({port: 8080});
        this.socketTracker = new SocketTracker();

        const apiKey = environment.getOpenAIApiKey();
        const model = environment.getOpenAIModel();
       
        const configuration = new Configuration({apiKey});
          
        const openai = new OpenAIApi(configuration);

        this.summarizer = new Summarizer( {openai, model} ); 

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

    getSummarizer(){
        return this.summarizer;
    }
}