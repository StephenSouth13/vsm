// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'athlete' } // 'athlete' hoặc 'admin'
});

module.exports = mongoose.model('User', userSchema);
