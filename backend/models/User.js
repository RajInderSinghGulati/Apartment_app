const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : String,
    flatNo : String,
    avatar : String,
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNum : {
        type : String,
        required : true,
        unique : true
    },
    role: { 
        type: String, enum: ['resident', 'admin', 'staff'], 
        default: 'resident'
    },
    houseMembers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    pets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Pet'
    }],
    staff : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Staff'
    }],
    vehicles : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vehicle'
    }]

});

module.exports = mongoose.model('User',UserSchema);