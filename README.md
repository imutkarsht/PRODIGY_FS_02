# PRODIGY_FS_02 (Real-Time Chat Application)

This is a real-time chat application built using modern web technologies. The application supports user authentication, room based messaging, and real-time messaging with live updates.

## Features

- **User Authentication**: Users can join chat rooms with unique usernames.
- **Real-Time Messaging**: Messages are sent and received in real-time using Socket.IO.
- **Room Management**: Users can join different chat rooms and switch between them.
- **Active User Tracking**: Tracks and displays the number of active users in each room.
- **Typing Indicator**: Shows when users are typing.
- **Message Timestamps**: Each message is timestamped according to the IST timezone.
- **Input Validation**: Ensures valid usernames and filters inappropriate language using bad-words library.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templating)
- **Real-Time Communication**: Socket.IO
- **Database**: MongoDB (Mongoose for ODM)
- **Styling**: Tailwind CSS
- **Utilities**: cookie-parser, dotenv, moment-timezone

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/imutkarsht/PRODIGY_FS_02.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and port:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Usage

After starting the server, navigate to `http://localhost:3000` in your browser. You will be presented with a login screen where you can enter a username and select a chat room.

## Code Snippets

### Server Setup (`index.js`)
```javascript
require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const socketEvents = require('./socket/socketEvents');
const app = express();
const server = createServer(app);
const io = new Server(server);
require('./config/cron');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', chatRoutes);

socketEvents(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
```
### socket Setup (`socketEvents.js`)
```js
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
```

### Message Models (`models/messageModel.js`)
```js
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const messageSchema = new mongoose.Schema({
    data: { type: String, required: true },
    sender: { type: String, required: true },
    sentAt: { type: String },
    belongsTo: { type: String, required: true }
}, { timestamps: true });

messageSchema.pre('save', function(next) {
    this.sentAt = moment.tz(this.createdAt, 'Asia/Kolkata').format('hh:mm A');
    next();
});

module.exports = mongoose.model('Message', messageSchema);
```

## Live Demo

Check out the live demo of the Note Keep App:

[Chatify-real time chatting](https://chatify-ut.onrender.com/)