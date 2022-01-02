const express = require("express"),
    app = express(),
    port = 7070,
    path = require("path"),
    cors = require("cors"),
    auth = require("./auth")

require("./model/db")()

if (process.env.NODE_ENV == "production") {
    process.on('uncaughtException', function(err) {
        console.log("\x1b[31m", 'Caught exception: ', err, '\x1b[0m');
    });
}

app.listen(port, () => {
    console.log(
        "\x1b[36m%s\x1b[0m", `backEnd Sumber Bening app | listening at http://localhost:${port}`, '\x1b[0m'
    )
})

app.get("/", (req, res) => {
    res.send("Server Running Properly")
})

app.use(cors())
app.use("/images", express.static(path.join(__dirname, "images")))

const login = require("./router/login")
app.use("/login", login)

const product = require("./router/product")
app.use("/product", product)

const transaction = require("./router/transaction")
app.use("/transaction", transaction)