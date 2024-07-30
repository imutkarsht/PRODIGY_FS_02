const Message = require('../models/messageModel');
const ActiveUsers = require('../models/activeUsersModel');
const ChatRoom = require('../models/chatRoomModel');

const handleGetHome = (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.redirect('/chat');
    } else {
        res.render('home');
    }
}

const handleGetChat =  async (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.redirect('/?message=Please%20Join%20with%20username%20first');
    } else {
        const messages = await Message.find({});
        const response = [username, messages];
        res.render('chat', { response: response });
    }
}

const handlePostChats = async (req, res) => {
    const username = req.body.username.trim();

    const existingUser = await ActiveUsers.findOne({ username: username });

    if (existingUser) {
        return res.redirect('/?message=Username%20already%20taken');
    }
    
    if (username.length < 4 || /[^a-zA-Z0-9_$]/.test(username)) {
        res.redirect('/?message=Username%20should%20be%20at%20least%20four%20letters%20and%20alphanumeric%20only%20(underscores%20and%20dollar%20signs%20are%20allowed)');
        return;
    }
    

    try {
        await new ActiveUsers({
            username: username,
        }).save();

    } catch (error) {
        console.error('Error saving username to database:', error);
        return res.redirect('/?message=something%20went%20wrong');
    }

    res.cookie('username', username, { maxAge: 25 * 60 * 1000 });
     try {
        const messages = await Message.find({});
        const response = [username, messages];
        res.render('chat', { response: response });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.redirect('/?message=something%20went%20wrong');
    }
}

const handleLeaveRoom = async (req, res) => {
    const username = req.cookies.username;

    if (username) {
        try {
            const user = await ActiveUsers.findOne({ username: username });
            
            if (user) {
                await ActiveUsers.deleteOne({ username: username });
                await ChatRoom.deleteMany({ createdBy: user._id });
            }

            res.cookie('username', '', { expires: new Date(0), httpOnly: true });
            res.redirect('/?message=you%20left%20the%20room');
        } catch (error) {
            console.error('Error handling leave room:', error);
            res.redirect('/?message=something%20went%20wrong');
        }
    } else {
        res.redirect('/');
    }
};

module.exports = {
    handleGetHome,
    handleGetChat,
    handlePostChats,
    handleLeaveRoom
}