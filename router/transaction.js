const express = require("express"),
    app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("../model/db")
const transaction = require("../model/transaction")

app.get("/", async(req, res) => {
    const transactions = await transaction.find()
    res.json({ transactions })
})

app.get("/:keyword", async(req, res) => {
    const keyword = req.params.keyword
    const transactionData = await transaction.findById(keyword)
    res.json({ transactionData })
})

app.post("/", async(req, res) => {
    let { name, phone, address, products } = req.body
    products = JSON.parse(products)
    const data = { customer: { name, phone, address }, products }
    transaction
        .create(data)
        .then((result) => {
            res.json({
                message: "data has been inserted",
                data: result,
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

app.put("/", async(req, res) => {
    let filter = { _id: req.body.transaction_id },
        { name, phone, address, products } = req.body,
        data = {}
    name || phone || address ? (data.customer = {}) : (data = {})
    products = products ? JSON.parse(products) : (products = null)
    name ? (data.customer.name = name) : (name = null)
    address ? (data.customer.address = address) : (address = null)
    phone ? (data.customer.phone = phone) : (phone = null)
    products ? (data.products = products) : (products = null)
    console.log(data)
    transaction
        .findOneAndUpdate(filter, data)
        .then((result) => {
            res.json({
                message: "data has been updated",
                data: result,
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

app.delete("/", async(req, res) => {
    let filter = { _id: req.body.transaction_id }
    transaction
        .deleteOne(filter)
        .then((result) => {
            res.json({
                message: "data has been deleted",
                data: result,
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

module.exports = app