# xisruoyhctaw


# Setup
```
npm i
cp .env.sample .env
```

Remember to put real values in the .env file, you'll need a valid openai key]

# Running

`node src/runner.js to run the server`

`node src/client.js to run the client`


# Commands
```
/msg <text> to send a message
/join <room> to join a room
/start to send a started typing message
/stop to send a stopped typing message
/catchup to get a summary of whats been said in the current room so far
```


# Testing
`npm test`


# TODO
- [ ] Add more comprehensive tests
- [ ] Add more commands - list active rooms
- [ ] Add an S3 Message store
- [ ] Add a DynamoDB Message store
- [ ] Add PII redaction using comprehend
- [ ] Dockerize solution
- [ ] Add python / java clients
- [ ] Add python / java server
- [ ] Add a UI
- [ ] Deploy solution to AWS

