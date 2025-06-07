const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    address : {type : String, required : true},
    avatar : String
});

module.exports = mongoose.model('Apartment',ApartmentSchema);