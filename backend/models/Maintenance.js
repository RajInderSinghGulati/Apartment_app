const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
    houseId : {type : mongoose.Schema.ObjectId, ref : 'House'},
    issue : {type : String , required : true},
    description : {type : String, required : true},
    resolvedStatus : {type : String , enum : ["Pending","In Progress","Completed"], default : "Pending"},
    date : Date,
    avatar : String //Photo incase required
});

module.exports = mongoose.model('Maintenance',MaintenanceSchema);