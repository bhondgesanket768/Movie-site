const mongoose = require("mongoose");
const config = require("../config/key");

function dbEnable() {
    mongoose.connect(config.mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log("mongodb connected successfully..."))
        .catch((ex) => console.log(ex));
}

module.exports = dbEnable;