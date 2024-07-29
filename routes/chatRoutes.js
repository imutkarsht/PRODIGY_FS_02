const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

router.get('/', (req, res) => {
    res.render('home');
});

router.post('/chat', async (req, res) => {
    const username = req.body.username;
    const messages = await Message.find({});
    const response = [username, messages];
    res.render('chat', { response: response });
});

module.exports = router;
