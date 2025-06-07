const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name : {type : String, required : true},
    date : Date,
    house : {type : mongoose.Schema.ObjectId, ref : 'House'},
    avatar : String,
    vehiclePlate : String, //if any
    status : {type : String, enum : ["Pending","Rejected","Approved"], default : "Pending"}
});

module.exports = mongoose.model('Visitor',VisitorSchema);