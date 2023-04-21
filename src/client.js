const WebSocket = require('ws');
const readline = require('readline');

function jsonify(type, name, text) {
    data = {
       type, name, text
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
                ws.send(jsonify('command', name, line));
            });
        
    }); 
})
ws.on('message', function(data, flags) {
    console.log("got message")
// convert the buffer to a string
    console.log(data.toString());
})



