'use strict';

const io = require('socket.io-client');
const locationSocket = io.connect('http://localhost:3000');

locationSocket.emit('join', {username: 'test user'});

locationSocket.on('sos', obj => {
  console.log('after going to server and back', obj);
});

locationSocket.emit('sosBroadcast', {username: ''});