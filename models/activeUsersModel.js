const mongoose = require('mongoose');

const activeUsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const ActiveUser = mongoose.model('ActiveUser', activeUsersSchema);
module.exports = ActiveUser;