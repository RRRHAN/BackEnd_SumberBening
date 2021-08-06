const mongoose = require("mongoose")

const product = mongoose.model(
    "product",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
        },
        barcode: {
            type: String,
        },
        image: {
            type: Array,
        },
    }, { timestamps: true })
)

module.exports = product