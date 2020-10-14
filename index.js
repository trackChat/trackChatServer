

const server = require('./src/server/server.js');
require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const socketIO = require('socket.io');

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
    console.log('from the index', socket.id);
    socketTable[socket.id] = userObj.username;
    console.log(socketTable);
  });

  io.emit('test', 'payload');


  socket.on('locationBroadcast', latLonName => {
    console.log(latLonName);
    io.emit('location', latLonName);
  });

  socket.on('chatBroadcast', chat => {
    console.log('chat from the index', chat);
    io.emit('chat', chat);
  });

  socket.on('sosBroadcast', alert => {
    io.emit('sos', alert);
  });

  socket.on('disconnect', () => {
    // const user = socketTable[socket.id];
    delete socketTable[socket.id];
    // io.emit('userLeaves', user);
    console.log(socketTable);
  });

});
