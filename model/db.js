const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/sumber_bening", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})