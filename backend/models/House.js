const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    block : {type: String, required : true},
    number : {type : String , required : true},
    apartment : {type : String , required : true},
    members : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    staff : [{type : mongoose.Schema.Types.ObjectId, ref : 'Staff'}],
    vehicles : [{type : mongoose.Schema.Types.ObjectId, ref : 'Vehicle'}],
    pets : [{type : mongoose.Schema.Types.ObjectId, ref : 'Pet'}],
});

module.exports = mongoose.model('House',HouseSchema);