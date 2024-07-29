const Message = require('../models/messageModel');

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
    if (username.length < 4 || /[^a-zA-Z0-9]/.test(username)) {
        res.redirect('/?message=Username%20should%20be%20at%20least%20four%20letters%20and%20alphanumeric%20only');
        return;
    }
    res.cookie('username', username, { maxAge: 25 * 60 * 1000 }); 
    const messages = await Message.find({});
    if(!messages){
        res.redirect('/?message=something%20went%20wrong')
    }
    const response = [username, messages];
    res.render('chat', { response: response });
}

module.exports = {
    handleGetHome,
    handleGetChat,
    handlePostChats
}