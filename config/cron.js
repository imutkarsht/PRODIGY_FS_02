const cron = require('node-cron');
const Message = require('../models/messageModel');

cron.schedule('*/5 * * * *', async () => {
    try {
        await Message.deleteMany({});
        console.log('Database cleared');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});
