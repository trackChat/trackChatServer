'use strict';

const io = require('socket.io-client');
const locationSocket = io.connect('http://localhost:3000');

locationSocket.emit('join', {username: 'test user'});

locationSocket.on('location', obj => {
  console.log('after going to server and back', obj);
});

locationSocket.emit('locationBroadcast', {username: 'josh', latitude: 47.6062, longitude: 122.3321});