const express = require("express");
const router = express();
const { Comment } = require("../models/comments");
const auth = require("../middleware/auth");

router.post("/saveComment", auth, (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if (err) return res.status(400).json({ success: false, err })

        Comment.find({ _id: comment._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.status(500).json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post("/getComments", (req, res) => {
    Comment.find({ postId: req.body.movieId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comments })
        })
})

router.post("/show/getComments", (req, res) => {
    Comment.find({ postId: req.body.showId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comments })
        })
})


module.exports = router;