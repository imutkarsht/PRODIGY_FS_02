const { handleUserConnected, handleDisconnect, handleChatMessage, handleTyping, handleStopTyping } = require('./socketControllers');

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('user connected', (userId) => handleUserConnected(io, socket, userId));
        socket.on('disconnect', () => handleDisconnect(io, socket));
        socket.on('chat message', (msg) => handleChatMessage(io, socket, msg));
        socket.on('typing', (userId) => handleTyping(socket, userId));
        socket.on('stop typing', (userId) => handleStopTyping(socket, userId));
    });
};
