const ChatRooms = require('../models/chatRoomModel')
const ActiveUser = require('../models/activeUsersModel')

const handleGetRooms =  async (req, res) => {
    const rooms = await ChatRooms.find({})
    if(!rooms) return res.render('/?message=error%20fetching%20rooms')
    res.render('room', {rooms: rooms})
}

const handleCreateRoom = async (req, res) => {
    const { name, topic}  = req.body;
    const username = req.cookies.username
    const user = await ActiveUser.findOne({ username });

    if (!user) {
        return res.redirect('/?message=User%20not%20found');
    }

    try{
        await new ChatRooms({name, topic,createdBy:user._id}).save();
        res.redirect('/room?message=room%20created%20Successfully')
    }catch(error){
        console.error('Error saving room to database:', error);
        return res.redirect('/room?message=something%20went%20wrong');
    }   
}

const handleJoinRoom = async (req, res) => {
    const id = req.params.id;
    const room = await ChatRooms.findById(id)
    if(!room) return res.redirect('/room?message=room%20not%20found')
    res.redirect('/chat')
}

const handleDeleteRoom = async (req, res) => {
    const id = req.params.id;
    const room = await ChatRooms.findByIdAndDelete(id)
    if(!room) return res.redirect('/room?message=something%20went%20wrong')
    res.redirect('/room?message=room%20deleted')
}

module.exports = {
    handleGetRooms,
    handleCreateRoom,
    handleJoinRoom,
    handleDeleteRoom
}