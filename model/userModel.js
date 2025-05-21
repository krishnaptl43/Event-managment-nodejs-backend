const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    image : {
        type : String,
        default : ""
    }
},{timestamps : true});

module.exports = model("users",userSchema);