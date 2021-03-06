'use strict';

const server = require('./src/server/server.js');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
require('express');
require('dotenv').config();

const INDEX = '/index.html';
const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const socketServer = server.app
  .use((request, response) => response.sendFile(INDEX, { root: __dirname }))
  .listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));

mongoose.connect(MONGODB_URI, mongooseOptions);

const io = socketIO(socketServer);

const socketTable = {};

io.on('connection', (socket) => {
  socket.on('join', userObj => {
    socketTable[socket.id] = userObj.username;
  });

  io.emit('test', 'payload');


  socket.on('locationBroadcast', latLonName => {
    io.emit('location', latLonName);
  });

  socket.on('chatBroadcast', chat => {
    io.emit('chat', chat);
  });

  socket.on('sosBroadcast', alert => {
    io.emit('sos', alert);
  });

  socket.on('disconnect', () => {
    delete socketTable[socket.id];
  });

});
