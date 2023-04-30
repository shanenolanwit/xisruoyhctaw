require('dotenv').config();
const Environment = require("./Environment");
const DependencyManager = require('./DependencyManager');

const WebSocketServerWrapper = require("./websocket/utils/WebSocketServerWrapper");

const environment = new Environment();
const dependencyManager = new DependencyManager({environment});


const wrapper = new WebSocketServerWrapper();
wrapper.init(dependencyManager);
