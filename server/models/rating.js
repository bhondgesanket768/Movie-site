const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    movieId: {
        type: String,
    },
    showId: {
        type: String,
    },
    rating: {
        type: Number
    }
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports.Rating = Rating