const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    house : {type : mongoose.Schema.ObjectId, ref : 'House', required : true},
    facility : [{type : mongoose.Schema.Types.ObjectId, ref : 'Facility'}],
    timeStart : {type : Date, required : true},
    timeEnd : {type : Date, required : true}
});

module.exports = mongoose.model('Booking',BookingSchema);