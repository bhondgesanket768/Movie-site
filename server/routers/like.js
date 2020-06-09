const express = require("express")
const router = express();

const { Like } = require("../models/like")
const { Dislike } = require("../models/dislike")
const auth = require("../middleware/auth");

router.post("/getLikes", (req, res) => {
    Like.find({ commentId: req.body.commentId })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, likes })
        })
})

router.post("/getDisLikes", (req, res) => {
    Dislike.find({ commentId: req.body.commentId })
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, dislikes })
        })
})

router.post("/upLike", auth, (req, res) => {
    const like = new Like(req.body)
    like.save((err, likeResult) => {
        if (err) res.status(400).json({ success: false, err })

        Dislike.findOneAndDelete(req.body)
            .exec((err, dislikeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true })
            })
    })
})

router.post("/unLike", auth, (req, res) => {
    Like.findOneAndDelete(req.body)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
})

router.post("/unDislike", auth, (req, res) => {
    Dislike.findOneAndDelete(req.body)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
})

router.post("/upDislike", auth, (req, res) => {
    const dislike = new Dislike(req.body)
    dislike.save((err, DislikeResult) => {
        if (err) res.status(400).json({ success: false, err })

        Like.findOneAndDelete(req.body)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true })
            })
    })
})

module.exports = router