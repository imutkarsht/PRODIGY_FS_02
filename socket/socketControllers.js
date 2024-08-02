const Message = require('../models/messageModel');
const Filter = require('bad-words');
const filter = new Filter();

const usersInRoom = {}; 

const handleUserConnected = (io, socket, { userId, roomName, avatar }) => {
    socket.userId = userId;
    socket.roomName = roomName;
    socket.avatar = avatar;
    socket.join(roomName);

    if (!usersInRoom[roomName]) {
        usersInRoom[roomName] = new Set();
    }
    usersInRoom[roomName].add(userId);

    const message = `${userId} joined the room ${roomName}`;
    io.to(roomName).emit('user join', { message });
    io.to(roomName).emit('update user count', { userCount: usersInRoom[roomName].size });
    io.to(roomName).emit('update active users', { users: Array.from(usersInRoom[roomName]) });
};


const handleDisconnect = (io, socket) => {
    if (socket.userId && socket.roomName) {
        usersInRoom[socket.roomName].delete(socket.userId);
        const message = `${socket.userId} left the room`;
        io.to(socket.roomName).emit('user left', { message });
        io.to(socket.roomName).emit('update user count', { userCount: usersInRoom[socket.roomName].size });
        io.to(socket.roomName).emit('update active users', { users: Array.from(usersInRoom[socket.roomName]) });

        if (usersInRoom[socket.roomName].size === 0) {
            delete usersInRoom[socket.roomName];
        }
    }
};


const handleReconnect = (io, socket, { userId, roomName, avatar }) => {
    handleUserConnected(io, socket, { userId, roomName, avatar });
};



const handleChatMessage = async (io, socket, msg) => {
    const { userId, message, avatar } = msg;
    const roomName = socket.roomName; 


    if (!roomName) {
        console.error('Room name is not defined');
        return;
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage || /^[\p{Emoji}\s]+$/u.test(trimmedMessage)) {
        return;
    }

    const filteredMessage = filter.clean(trimmedMessage);
    const newMessage = new Message({
        data: filteredMessage,
        sender: userId,
        belongsTo: roomName,
        avatar: avatar
    });

    try {
        await newMessage.save();
        const response = {
            from: userId,
            message: filteredMessage,
            sentAt: newMessage.sentAt,
            avatar: avatar
        };
        io.to(roomName).emit('chat message', response); 
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

const handleTyping = (socket, userId) => {
    const roomName = socket.roomName; 
    socket.to(roomName).emit('typing', userId); 
};

const handleStopTyping = (socket, userId) => {
    const roomName = socket.roomName; 
    socket.to(roomName).emit('stop typing', userId); 
};

module.exports = {
    handleUserConnected,
    handleReconnect,
    handleDisconnect,
    handleChatMessage,
    handleTyping,
    handleStopTyping
};
