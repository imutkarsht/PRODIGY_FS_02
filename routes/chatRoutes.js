const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel')
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
const feedback = require('../models/feedbackModel');

router.get('/', handleGetHome);

router.get('/chat/:room', handleGetChat);

router.post('/chat/:room', handlePostChats);

router.get('/logout', handleLeaveRoom);

router.get('/feedback', handleGetFeedbackPage)

router.post('/feedback', handlePostReview)

router.get('/about', async (req, res)=> {
    const feedbacks = await Feedback.find({approved: true})
    if(!feedbacks) return res.redirect('/?message=fail%20to%20Fetch%20Feedbacks')
    return res.render('about', {feedbacks: feedbacks})
})


module.exports = router;
