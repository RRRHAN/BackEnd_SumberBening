const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
        product_id: { type: String },
    }, { _id: false }),
    transaction = mongoose.model(
        "transaction",
        new mongoose.Schema({
            customer: {
                name: String,
                address: String,
                phone: String,
            },
            products: [productsSchema],
            date: {
                type: Date,
                required: true,
                default: Date.now,
            },
        }, { timestamps: true })
    )

module.exports = transaction