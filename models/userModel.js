const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    content: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'unread' }
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: { type: String, default: 'user'},
    notifications: [NotificationSchema],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isBlocked: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;