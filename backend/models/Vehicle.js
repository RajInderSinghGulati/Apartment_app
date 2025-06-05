const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    model : {
        type : String,
        required : true
    },
    plateNum : {
        type : String,
        required : true,
        unique : true
    },
    usedBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }]
});

module.exports = mongoose.model('Vehicle',VehicleSchema);