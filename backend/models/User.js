const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: String,
    email: { type: String, required: true, unique: true },
    phoneNum: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    status : {type : String, enum : ["Owner","Tenant"],default : "Owner"},
    house: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }]
});

module.exports = mongoose.model('User', UserSchema);
