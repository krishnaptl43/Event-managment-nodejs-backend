const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Conference", "Workshop", "Seminar", "Celebration"]
    },
    slots: {
        type: Number,
        required: true,
    },
    per_slot_price: {
        type: Number,
        required: true,
    },
    venue: {
        type: String,
        required: true
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    cancel_message: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    booking_start_date: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
}, { timestamps: true });

module.exports = model("events", eventSchema);