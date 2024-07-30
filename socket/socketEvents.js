const Message = require('../models/messageModel');
const Filter = require('bad-words');
const filter = new Filter();

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('user connected', (userId) => {
            socket.userId = userId; 
            const response = {
                message: `${userId} Joined the room`
            };
            io.emit('user join', response);
        });

        socket.on('disconnect', () => {
            const response = {
                message: `${socket.userId} left the room`
            };
            io.emit('user left', response);
        });

        socket.on('chat message', async (msg) => {
            const { userId, message } = msg;
            const trimmedMessage = message.trim();
            
            if (!trimmedMessage) {
                return;
            }

            const emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
            if (emojiOnlyRegex.test(trimmedMessage)) {
                return;
            }

            const filteredMessage = filter.clean(trimmedMessage);
            const newMessage = new Message({
                data: filteredMessage,
                sender: userId
            });

            try {
                await newMessage.save();
            } catch (error) {
                console.error('Error saving message:', error);
            }

            const response = {
                from: userId,
                message: filteredMessage,
                sentAt: newMessage.sentAt
            };

            io.emit('chat message', response);
        });

        socket.on('typing', (userId) => {
            socket.broadcast.emit('typing', userId);
        });

        socket.on('stop typing', (userId) => {
            socket.broadcast.emit('stop typing', userId);
        });
    });
};
