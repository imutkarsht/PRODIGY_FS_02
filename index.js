require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const db = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const socketEvents = require('./socket/socketEvents');
const cron = require('node-cron')
const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', chatRoutes);

cron.schedule('*/5 * * * *', async () => {
    try {
        await Message.deleteMany({});
        console.log('Database cleared');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});

socketEvents(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
