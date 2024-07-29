const cron = require('node-cron');
const Message = require('../models/messageModel');
const ActiveUsers = require('../models/activeUsersModel')

cron.schedule('*/5 * * * *', async () => {
    try {
        await Message.deleteMany({});
        console.log('Database cleared');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});

cron.schedule('*/25 * * * *', async () => {
    try{
        await ActiveUsers.deleteMany({});
        console.log('deleted active users');
    } catch (error){
        console.error('something went wrong')
    }
})
