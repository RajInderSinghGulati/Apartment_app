const mongoose = require('mongoose');

const HelperSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phoneNum : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true
    },
    houseContracted : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    avatar : String
});

module.exports = mongoose.model('Helper',HelperSchema);