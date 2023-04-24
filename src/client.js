const WebSocket = require('ws');
const readline = require('readline');

function jsonify(timestamp, text) { 
    data = {
       timestamp, text
    }
    return JSON.stringify(data);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080');

function printHelp(){
    console.log("/join <room> - join a room")
    console.log("/msg <message> - send a message to the room")
    console.log("/start send a typing notification")
    console.log("/stop send an idle notification")
}

ws.on('open', function() {
    rl.question('Enter your name: ', function(name) {
        const timestamp = new Date().getTime();
        ws.send(jsonify(timestamp, `/register ${name}`));
        printHelp()
            rl.on('line', function(line) {
                const timestamp = new Date().getTime();
                ws.send(jsonify(timestamp, line));
                
            });
        
    }); 
})
ws.on('message', function(data, flags) {
    console.log(data.toString());
})



