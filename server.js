const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({userName, roomCode}) => {
        socket.join(roomCode);
    });

    socket.on('chat message', ({text, userName, roomCode})=>{
        io.to(roomCode).emit('chat message', {text, userName});
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
