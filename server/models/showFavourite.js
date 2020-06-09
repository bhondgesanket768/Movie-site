const mongoose = require("mongoose");
const Schema = mongoose.Schema

const showFavouriteSchema = new mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    showId: {
        type: String
    },
    showName: {
        type: String
    },
    vote: {
        type: Number
    }
}, { timestamps: true })


const ShowFavourite = mongoose.model("ShowFavourite", showFavouriteSchema);

module.exports.ShowFavourite = ShowFavourite