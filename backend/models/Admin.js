const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: String,
    email: { type: String, required: true, unique: true },
    phoneNum: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Admin', AdminSchema);
