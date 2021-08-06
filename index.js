const express = require("express"),
	app = express(),
	port = 7070,
	path = require("path"),
	cors = require("cors")

app.listen(port, () => {
	console.log(
		`backEnd Sumber Bening app | listening at http://localhost:${port}`
	)
})

app.get("/", (req, res) => {
	res.send("<h1>Welcome</h1>")
})

app.use(cors())
app.use("/images", express.static(path.join(__dirname, "images")))

const product = require("./router/product")
app.use("/product", product)

const transaction = require("./router/transaction")
app.use("/transaction", transaction)
