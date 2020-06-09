const express = require("express");
const router = express();
const { ShowFavourite } = require("../models/showFavourite");
const auth = require("../middleware/auth");

router.post("/number", (req, res) => {
    ShowFavourite.find({ showId: req.body.showId })
        .exec((err, showFavourite) => {
            if (err) return res.status(400).send(err);

            return res.status(200).json({ success: true, number: showFavourite.length })
        })
})

router.post("/favourited", auth, (req, res) => {
    ShowFavourite.find({ userFrom: req.body.userFrom, showId: req.body.showId })
        .exec((err, favourite) => {
            if (err) return res.status(400).send(err)
            let result = false;
            if (favourite.length != 0) {
                result = true;
            }
            return res.status(200).json({ success: true, favourited: result })
        })
})

router.post("/addFavourite", auth, (req, res) => {
    const favourite = new ShowFavourite(req.body);

    favourite.save((err, result) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

router.post("/removeFavourite", auth, (req, res) => {
    ShowFavourite.findOneAndDelete({ showId: req.body.showId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(404).send(err)
            return res.status(200).json({ success: true })
        })
})

router.post("/getFavourite", auth, (req, res) => {
    ShowFavourite.find({ userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(404).send(err)
            return res.status(200).json({ success: true, result })
        })
})

module.exports = router;