const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UsersService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const usersSerice = new UsersService();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {

    //communicating that a new person has joined the chat

    socket.on('join', (name) => {
        usersService.addUser({
            id: socket.id,
            name
        });
        io.emit('update', {
            users: usersService.getAllUsers()
        });
    });

    //client closes the chat

    socket.on('disconnect', () => {
        usersService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: usersService.getAllUsers()
        });
    });

    //sending message

    socket.on('message', (message) => {
        const {name} = usersService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        });
    });

});

server.listen(3000, () => {
    console.log('listerning on *:3000');
});