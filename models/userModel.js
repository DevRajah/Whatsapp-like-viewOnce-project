//const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
  
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    }
    
}, {timestamps: true});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
