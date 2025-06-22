const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    model : {type : String, required : true},
    plateNum : {type : String, required : true, unique : true},
    usedBy : {type : mongoose.Schema.ObjectId, ref : 'House', required : true}
});

module.exports = mongoose.model('Vehicle',VehicleSchema);