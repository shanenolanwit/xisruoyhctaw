const Environment = require("./Environment");
const DependencyManager = require('./DependencyManager');

const WebSocketServerWrapper = require("./websocket/utils/WebSocketServerWrapper");


process.env.MESSAGE_STORE_TYPE = "file";
process.env.MESSAGE_STORE_PATH = "/Users/shane/masters/xisruoyhctaw/messages/messages.json";
const environment = new Environment();
const dependencyManager = new DependencyManager(environment);


const wrapper = new WebSocketServerWrapper();
wrapper.init(dependencyManager);






