const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
    name : {type : String, required : true},
    address : {type : String, required : true},
    avatar : String
});

module.exports = mongoose.model('Society',SocietySchema);