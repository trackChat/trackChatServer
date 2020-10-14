'use strict';

const io = require('socket.io-client');
const chatSocket = io.connect('http://localhost:3000');

chatSocket.emit('join', {username: 'test user'});

chatSocket.on('chat', obj => {
  console.log('chat capture here', obj);
});


chatSocket.emit('chatBroadcast', {username: 'test', chat:''});
console.log('to and from the server');
