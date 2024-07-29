const express = require('express');
const router = express.Router();
const 
{ 
    handleGetHome,
    handleGetChat, 
    handlePostChats
} 
= require('../controllers/chatController');

router.get('/', handleGetHome);

router.get('/chat', handleGetChat);

router.post('/chat', handlePostChats);

module.exports = router;
