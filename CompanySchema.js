const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
},{collection:'Company'});

module.exports = mongoose.model('Company', companySchema);

