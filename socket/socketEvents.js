const { handleUserConnected, handleReconnect, handleDisconnect, handleChatMessage, handleTyping, handleStopTyping } = require('./socketControllers');

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('user connected', ({ userId, roomName }) => handleUserConnected(io, socket, { userId, roomName }));
        socket.on('user reconnected', ({ userId, roomName }) => handleReconnect(io, socket, { userId, roomName }));
        socket.on('disconnect', () => handleDisconnect(io, socket));
        socket.on('chat message', (msg) => handleChatMessage(io, socket, msg));
        socket.on('typing', (userId) => handleTyping(socket, userId));
        socket.on('stop typing', (userId) => handleStopTyping(socket, userId));
    });
};
