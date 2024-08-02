const express = require('express');
const router = express.Router();
const 
{ 
    handleGetHome,
    handleGetChat, 
    handlePostChats,
    handleLeaveRoom,
    handleGetFeedbackPage,
    handlePostReview
} 
= require('../controllers/chatController');

router.get('/', handleGetHome);

router.get('/chat/:room', handleGetChat);

router.post('/chat/:room', handlePostChats);

router.get('/logout', handleLeaveRoom);

router.get('/feedback', handleGetFeedbackPage)

router.post('/feedback', handlePostReview)

router.get('/about', (req, res)=> res.render('about'))

module.exports = router;
