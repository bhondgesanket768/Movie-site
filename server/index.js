const express = require("express");
const app = express();
const path = require("path");

require("./startup/db")();
require("./startup/routes")(app);

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listerning to the port ${port}....`));