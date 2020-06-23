const express = require("express");
const router = express();
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const saltRound = 10;
const multer = require("multer");
const cloudinary = require("../startup/cloudnary")
const fs = require("fs")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

router.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, userData) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, userData });
    });
})

router.post("/login", (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.status(400).json({ loginSuccess: false, message: "user does not exist" })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ loginSuccess: false, message: "Wrong password" })

            user.generateAuthToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("x_authExp", user.tokenExp);
                res.cookie("x_auth_token", user.token).status(200).json({ loginSuccess: true, userId: user._id, userName: user.name })
            })
        })
    })
})

router.post("/forgot", (req, res) => {

    bcrypt.genSalt(saltRound, (err, salt) => {
        if (err) return res.send(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.send(err);
            User.updateOne({ email: req.body.email }, { password: hash }, (err, data) => {
                if (err) return res.status(400).json({ change: false, message: "something went wrong" });
                return res.status(200).json({ change: true })
            })
        })
    })
})

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, data) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    })
})

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, async err => {

        if (err) {
            return res.json({ success: false, err })
        }
        const uploader = async (path) => await cloudinary.uploads(path, "image")

        const files = req.file

        const { path } = files

        const newPath = await uploader(path)

        fs.unlinkSync(path)
        return res.json({ success: true, image: newPath, fileName: res.req.file.filename })
    })

})

router.post("/changeProfile", auth, (req, res) => {
    User.updateOne({ _id: req.body.userId }, { image: req.body.image }, (err, result) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true })
    })
})


module.exports = router;