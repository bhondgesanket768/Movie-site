const express = require("express");
const router = express();
const { Favourite } = require("../models/favourite");
const auth = require("../middleware/auth");



router.post("/number", (req, res) => {
    Favourite.find({ movieId: req.body.movieId })
        .exec((err, favourite) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, FavouriteNumber: favourite.length })
        })
})

router.post("/favourited", auth, (req, res) => {
    Favourite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, favourite) => {
            if (err) return res.status(400).send(err);
            let result = false;
            if (favourite.length !== 0) {
                result = true;
            }
            return res.status(200).json({ success: true, favourited: result })
        })
})

router.post("/addToFavourite", auth, (req, res) => {
    const favourite = new Favourite(req.body)

    favourite.save((err, data) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post("/removeFromFavourite", auth, (req, res) => {
    Favourite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data })
        })
})

router.post("/getFavourite", auth, (req, res) => {
    Favourite.find({ userFrom: req.body.userFrom })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, data })
        })
})

module.exports = router;