const mongoose = require('mongoose')
const moment = require('moment-timezone');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
},{timestamps: true})

feedbackSchema.pre('save', function(next) {
    const istTime = moment.tz(this.createdAt, 'Asia/Kolkata').format('hh:mm A');
    this.reviewAt = istTime;
    next();
});

const feedback = mongoose.model('feedback', feedbackSchema)
module.exports = feedback