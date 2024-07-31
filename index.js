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