const express = require("express"),
    app = express(),
    multer = require("multer"),
    path = require("path"),
    fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, "./images/products")
    },
    filename: (req, file, cb) => {
        // generate file name
        cb(null, "product-" + Date.now() + path.extname(file.originalname))
    },
})
let upload = multer({ storage })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const product = require("../model/product")

app.get("/", async(req, res) => {
    const products = await product.find().sort({ updatedAt: -1 }).limit(20)
    res.json({ products })
})

app.get("/:keyword", async(req, res) => {
    const keyword = req.params.keyword
    const products = await product.find({
        name: { $regex: keyword, $options: "i" },
    })
    res.json({ products })
})
app.get("/id/:id", async(req, res) => {
    const id = req.params.id
    const data_product = await product.findById(id)
    res.json({ product: data_product })
})

app.post("/", upload.array("image"), async(req, res) => {
    let { name, price, barcode, stock } = req.body,
        data = { name, price, barcode, stock }
    if (req.files) {
        data.image = []
        req.files.forEach((element) => {
            data.image.push(element.filename)
        })
    }
    product
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

app.post("/image", upload.array("image"), async(req, res) => {
    let product_id = req.body.product_id,
        product_data = await product.findById(product_id),
        image = product_data.image
    req.files.forEach((element) => {
        image.push(element.filename)
    })
    const data = { image }
    product.findByIdAndUpdate(product_id, data).then((result) => {
        res.json({
            message: "image(s) has been inserted",
            data: result,
        })
    })
})

app.put("/", async(req, res) => {
    let filter = { _id: req.body.product_id }

    product
        .findOneAndUpdate(filter, req.body)
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
    let product_id = req.body.product_id
    console.log(product_id)
    product
        .findByIdAndDelete(product_id)
        .then((result) => {
            result.image.forEach((element) => {
                let dir = path.join(__dirname, "..", "images", "products", element)
                fs.unlink(dir, (error) => {})
            })
            res.json({
                message: "Product has been deleted",
                data: result,
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

app.delete("/image", async(req, res) => {
    let product_id = req.body.product_id,
        image = req.body.image
    dir = path.join(__dirname, "..", "images", "products", image)
    fs.unlink(dir, (error) => {})
    product
        .findByIdAndUpdate(
            product_id, { $pull: { image } }, { useFindAndModify: false }
        )
        .then((result) => {
            res.json({
                message: "image has been deleted",
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