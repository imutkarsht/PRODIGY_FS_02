const express = require('express');
const router = express.Router();
const 
{ 
    handleGetHome,
    handleGetChat, 
    handlePostChats,
    handleLeaveRoom
} 
= require('../controllers/chatController');

router.get('/', handleGetHome);

router.get('/chat/:room', handleGetChat);

router.post('/chat/:room', handlePostChats);

router.get('/logout', handleLeaveRoom);

module.exports = router;
