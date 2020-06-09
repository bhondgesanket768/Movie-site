const express = require("express");
const router = express();
const auth = require("../middleware/auth");
const { Rating } = require("../models/rating")

router.post("/getRating", auth, (req, res) => {
    Rating.findOne({ showId: req.body.showId, userId: req.body.userId }, (err, rating) => {
        if (err) return res.status(404).send(err)
        if (!rating) return res.status(200).json({ success: true, rating: { rating: 0 } })

        return res.status(200).json({ success: true, rating })
    })
})

router.post("/upDateRating", auth, (req, res) => {
    Rating.findOne({ userId: req.body.userId, showId: req.body.showId }, (err, rating) => {
        if (err) return res.status(400).send(err);

        if (!rating) {
            const rating = new Rating(req.body);
            rating.save((err, rating) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true, rating })
            })
        }
        else {
            Rating.findOneAndUpdate({ userId: req.body.userId, showId: req.body.showId }, { rating: req.body.rating }, { new: true }, (err, rating) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({ success: true, rating })
            })
        }
    })
})

module.exports = router