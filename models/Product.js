const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: String,
    price:{
        type: Number,
        required: true,
    },
    category: String,
    stock: {
        type: Number,
        default: 0,
    },
    imageUrl: String,
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        red: "User",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
