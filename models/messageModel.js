const mongoose = require('mongoose');
const moment = require('moment-timezone');

const messageSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    sentAt: {
        type: String
    },
    belongsTo: {
        type: "string",
        required: true
    }
}, { timestamps: true });

messageSchema.pre('save', function(next) {
    const istTime = moment.tz(this.createdAt, 'Asia/Kolkata').format('hh:mm A');
    this.sentAt = istTime;
    next();
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
