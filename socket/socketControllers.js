const Message = require('../models/messageModel');
const Filter = require('bad-words');
const filter = new Filter();

const handleUserConnected = (io, socket, userId) => {
    socket.userId = userId; 
    const message = `${userId} joined the room`;
    io.emit('user join', { message });
};

const handleDisconnect = (io, socket) => {
    if (socket.userId) {
        const message = `${socket.userId} left the room`;
        io.emit('user left', { message });
    }
};

const handleChatMessage = async (io, socket, msg) => {
    const { userId, message } = msg;
    const trimmedMessage = message.trim();

    if (!trimmedMessage || /^[\p{Emoji}\s]+$/u.test(trimmedMessage)) {
        return;
    }

    const filteredMessage = filter.clean(trimmedMessage);
    const newMessage = new Message({
        data: filteredMessage,
        sender: userId
    });

    try {
        await newMessage.save();
        const response = {
            from: userId,
            message: filteredMessage,
            sentAt: newMessage.sentAt
        };
        io.emit('chat message', response);
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

const handleTyping = (socket, userId) => {
    socket.broadcast.emit('typing', userId);
};

const handleStopTyping = (socket, userId) => {
    socket.broadcast.emit('stop typing', userId);
};

module.exports = {
    handleUserConnected,
    handleDisconnect,
    handleChatMessage,
    handleTyping,
    handleStopTyping
};
