const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const saltRound = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    lastname: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenexp: {
        type: String
    },
    image: {
        type: String
    }
});

userSchema.pre("save", function (next) {
    var user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(saltRound, (err, salt) => {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateAuthToken = function (cb) {
    var user = this;
    const token = jwt.sign(user._id.toHexString(), "secret");
    user.token = token;
    var oneHour = moment().add(1, 'hour').valueOf();
    user.tokenExp = oneHour;

    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    jwt.verify(token, "secret", (err, decode) => {
        user.findOne({ _id: decode, token }, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model("User", userSchema);

module.exports.User = User;