const mongoose = require("mongoose")
let connect = () => {
    mongoose.connect("mongodb://localhost:27017/sumber_bening", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("\x1b[36m%s\x1b[0m", "Database Connected", '\x1b[0m')
        })
        .catch((error) => {
            console.error("\x1b[31m", error.name, error.message, '\x1b[0m')
            connect()
        })
}
module.exports = connect