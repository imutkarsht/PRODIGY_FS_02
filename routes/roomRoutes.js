const express = require('express');
const { handleGetRooms, handleCreateRoom, handleJoinRoom, handleDeleteRoom } = require('../controllers/roomController');
const router = express.Router();


router.get('/', handleGetRooms)

router.post('/create', handleCreateRoom)

router.get('/join/:id', handleJoinRoom)

router.get('/delete/:id', handleDeleteRoom)

module.exports = router