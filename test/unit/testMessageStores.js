/* eslint-disable max-len */
const assert = require('assert');

const InMemoryMessageStore = require('../../src/datastores/messages/InMemoryMessageStore');
const FileSystemMessageStore = require('../../src/datastores/messages/FileSystemMessageStore');
const Message = require('../../src/domain/Message');


const FakeFS = require('../fixtures/FakeFS');


describe('Unit - In memory message store', () => {
//   const publishStub = sinon.stub().returns({ promise: () => {} });

  it('should be possible to add messages', async () => {
    const store = new InMemoryMessageStore();
    const name = 'daffy'
    const room = 'intros';
    const message = new Message({ timestamp: 11111, text: '/msg hello' });
    await store.addMessage(message, name, room);
    const messages = await store.getMessagesForRoom(room);
    assert.equal(messages.length, 1);
    assert.equal(messages[0].name, name);
    assert.equal(messages[0].text, 'hello');
    const messageTwo = new Message({ timestamp: 22222, text: '/msg goodbye' });
    await store.addMessage(messageTwo, name, room);
    const messagesTwo = await store.getMessagesForRoom(room);
    assert.equal(messagesTwo.length, 2);
    assert.equal(messagesTwo[0].name, name);
    assert.equal(messagesTwo[0].text, 'hello');
    assert.equal(messagesTwo[1].name, name);
    assert.equal(messagesTwo[1].text, 'goodbye');
  });


  it('should be possible to add messages to filesystem', async () => {
    const path = '/tmp/test-messages.json';
    const fs = new FakeFS();
    const store = new FileSystemMessageStore({path, fs });
    const name = 'daffy'
    const room = 'intros';
    const message = new Message({ timestamp: 11111, text: '/msg hello' });
    await store.addMessage(message, name, room);
    const messages = await store.getMessagesForRoom(room);
    assert.equal(messages.length, 1);
    assert.equal(messages[0].name, name);
    assert.equal(messages[0].text, 'hello');
    const messageTwo = new Message({ timestamp: 22222, text: '/msg goodbye' });
    await store.addMessage(messageTwo, name, room);
    const messagesTwo = await store.getMessagesForRoom(room);
    assert.equal(messagesTwo.length, 2);
    assert.equal(messagesTwo[0].name, name);
    assert.equal(messagesTwo[0].text, 'hello');
    assert.equal(messagesTwo[1].name, name);
    assert.equal(messagesTwo[1].text, 'goodbye');
  });

});