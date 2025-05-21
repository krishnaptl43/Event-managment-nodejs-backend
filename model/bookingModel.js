const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    attendee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref : "users"
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref : "events"
    },
    receiced_amount : {
       type : Number,
       required : true
    },
    number_of_slots : {
        type : Number,
        default : 1
    },
    is_cancel : {
        type : Boolean,
        default : false
    },
    is_confirm : {
        type : String,
        enum : ["Confirm","Failed","Pending"],
        default : "Confirm"
    }

}, { timestamps: true });

module.exports = model('booking', bookingSchema);