const mongoose = require("mongoose");
const Schema = mongoose.Schema

const favouriteSchema = new mongoose.Schema({
    userFrom:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    movieId:{
        type:String
    },
    movieTitle:{
        type:String
    },
    movieImage:{
        type:String
    },
    movieRunTime:{
        type:String
    }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports.Favourite = Favourite;