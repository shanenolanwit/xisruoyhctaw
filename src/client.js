const WebSocket = require('ws');
const readline = require('readline');

function jsonify(timestamp, name, text) { 
    data = {
       timestamp, name, text
    }
    return JSON.stringify(data);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function() {
    rl.question('Enter your name: ', function(name) {
       
            rl.on('line', function(line) {
                const timestamp = new Date().getTime();
                ws.send(jsonify(timestamp, name, line));
            });
        
    }); 
})
ws.on('message', function(data, flags) {
    console.log("got message")
    console.log(data.toString());
})



