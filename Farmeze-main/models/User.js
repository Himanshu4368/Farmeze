const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    phone : {
        type: String,
        required: true,
        unique: true,

    },
    otp : {
        type: String,
        

    },
    otpExpiresAt: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }


}, {
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);