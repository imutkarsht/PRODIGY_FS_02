const Message = require('../models/messageModel');

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('user connected', (userId) => {
            console.log(`User connected with ID: ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('chat message', async (msg) => {
            const { userId, message } = msg;
            const newMessage = new Message({
                data: message,
                sender: userId
            });
            
            try {
                await newMessage.save();
            } catch (error) {
                console.error('Error saving message:', error);
            }
            const response = {
                from: userId,
                message: message,
                sentAt: newMessage.sentAt
            };

            io.emit('chat message', response);
        });
    });
};
