const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
    name : {type : String, required : true},
    address : {type : String, required : true},
    avatar : {type : String, default : null}
});

module.exports = mongoose.model('Society',SocietySchema);