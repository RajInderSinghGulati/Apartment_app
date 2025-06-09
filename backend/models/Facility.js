const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    name : {type : String, required : true},
    society : {type : mongoose.Schema.ObjectId, ref : 'Society',required : true},
    description : String,
    avatar : String
});

module.exports = mongoose.model('Facility',FacilitySchema);