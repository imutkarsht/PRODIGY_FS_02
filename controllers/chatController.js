const Message = require('../models/messageModel');
const ActiveUsers = require('../models/activeUsersModel');
const ChatRoom = require('../models/chatRoomModel');
const feedback = require('../models/feedbackModel')

const handleGetHome = (req, res) => {
    const cookieData = req.cookies.cookieData || {};
    const username = cookieData.username;
    const roomName = cookieData.room;
    if (username && roomName) {
        res.redirect(`/chat/${roomName}`);
    } else {
        res.render('home');
    }
};

const handleGetChat = async (req, res) => {
    const cookieData = req.cookies.cookieData || {};
    const username = cookieData.username;
    const cookieRoom = cookieData.room;
    const room = req.params.room;
    if(cookieRoom !== room) return res.redirect(`/chat/${cookieRoom}?message=leave%20this%20room%to%20join%20other`)
    if (!username) {
        res.redirect('/?message=Please%20Join%20with%20username%20first%20-f');
    } else {
        try {
            const messages = await Message.find({ belongsTo: room });
            const response = [username, messages];
            res.render('chat', { response });
        } catch (error) {
            console.error('Error retrieving messages:', error);
            res.redirect('/?message=something%20went%20wrong%20-f');
        }
    }
};

const handlePostChats = async (req, res) => {
    const username = (req.body.username.trim()).toLowerCase();
    let avatar = req.body.avatar
    const room = req.body.room;
    const existingUser = await ActiveUsers.findOne({ username });
    if(!avatar) avatar = '/images/avatars/avatar1.jpg'
    if(!room) return res.redirect('/?message=please%20select%20a%20valid%20room%20-f')

    if (existingUser) {
        return res.redirect('/?message=Username%20already%20taken%20-f');
    }

    if (username.length < 4 || /[^a-zA-Z0-9_$]/.test(username)) {
        return res.redirect('/?message=Username%20should%20be%20at%20least%20four%20letters%20and%20alphanumeric%20only%20(underscores%20and%20dollar%20signs%20are%20allowed)%20-f');
    }

    try {
        await new ActiveUsers({ username, avatar }).save();
    } catch (error) {
        console.error('Error saving username to database:', error);
        return res.redirect('/?message=something%20went%20wrong%20-f');
    }

    res.cookie('cookieData', { username, room }, { maxAge: 25 * 60 * 1000 });

    try {
        const messages = await Message.find({ belongsTo: room });
        const response = [username, messages, room, avatar];
        res.render('chat', { response });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.redirect('/?message=something%20went%20wrong%20-f');
    }
};

const handleLeaveRoom = async (req, res) => {
    const cookieData = req.cookies.cookieData || {};
    const username = cookieData.username;

    if (username) {
        try {
            const user = await ActiveUsers.findOne({ username });

            if (user) {
                await ActiveUsers.deleteOne({ username });
                await ChatRoom.deleteMany({ createdBy: user._id });
            }

            res.cookie('cookieData', '', { expires: new Date(0), httpOnly: true });
            res.redirect('/?message=you%20left%20the%20room');
        } catch (error) {
            console.error('Error handling leave room:', error);
            res.redirect('/?message=something%20went%20wrong');
        }
    } else {
        res.redirect('/');
    }
};

const handleGetFeedbackPage = (req, res) => {
    res.render('feedback')
}

const handlePostReview = async (req, res) => {
    const { name, email, review } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.redirect('/feedback?message=Invalid%20email%20format%20-f');
    }

    try {
        const newReview = await new feedback({ name, email, review, approved: false }).save();
        if (!newReview) {
            return res.redirect('/feedback?message=fail%20to%20send%20review%20-f');
        }
        return res.redirect('/feedback?message=feedback%20recorded%20Successfully%20-s');
    } catch (error) {
        console.error('Error saving review:', error);
        return res.redirect('/feedback?message=An%20error%20occurred%20while%20saving%20the%20review%20-f');
    }
};


module.exports = {
    handleGetHome,
    handleGetChat,
    handlePostChats,
    handleLeaveRoom,
    handleGetFeedbackPage,
    handlePostReview
};
