const express = require('express');
const router = express.Router();
const ChatRooms = require('../models/chatRoomModel')

router.get('/', async (req, res) => {
    const rooms = await ChatRooms.find({})
    if(!rooms) return res.render('/?message=error%20fetching%20rooms')
    res.render('room', {rooms: rooms})
})

router.post('/create', async(req, res) => {
    const { name, topic}  = req.body;
    try{
        await new ChatRooms({name, topic}).save();
        res.redirect('/room?message=room%20created%20Successfully')
    }catch(error){
        console.error('Error saving room to database:', error);
        return res.redirect('/room?message=something%20went%20wrong');
    }   
})

router.get('/join/:id', async (req, res) => {
    const id = req.params.id;
    const room = await ChatRooms.findById(id)
    if(!room) return res.redirect('/room?message=room%20not%20found')
    res.redirect('/chat')
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const room = await ChatRooms.findByIdAndDelete(id)
    if(!room) return res.redirect('/room?message=something%20went%20wrong')
    res.redirect('/room?message=room%20deleted')
})

module.exports = router