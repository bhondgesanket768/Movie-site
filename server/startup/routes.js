const user = require("../routers/users");
const favourite = require("../routers/favourite");
const showFavourite = require("../routers/showFavourite");
const comments = require("../routers/comment")
const likes = require("../routers/like")
const rating = require("../routers/rating")
const showRating = require("../routers/showRating");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

function routes(app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use("/api/users", user);
    app.use("/api/favourite", favourite);
    app.use("/api/comments", comments);
    app.use("/api/likes", likes);
    app.use("/api/rating", rating);
    app.use("/api/showFavourite", showFavourite);
    app.use("/api/showRating", showRating);
}

module.exports = routes;