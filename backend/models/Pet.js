const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name : String,
    type : String,
    avatar : String,
    house : {type : mongoose.Schema.ObjectId, ref : 'House', required : true}
});

module.exports = mongoose.model('Pet',PetSchema);