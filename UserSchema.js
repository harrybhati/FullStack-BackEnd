const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true },
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: {
         type: String,
         required: true },
    role: {
         type: String,
         enum: ['IT_ADMIN', 'IT_USER_NORMAL'],
          required: true },
    email: { 
        type: String, 
        required: true,
         unique: true },
    mobile: { 
        type: String, 
        required: true,
        unique: true }
},{collection:"User"});

module.exports = mongoose.model('User', userSchema);
