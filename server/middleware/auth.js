const { User } = require("../models/users");

function auth(req, res, next) {
    var token = req.cookies.x_auth_token;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(400).json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = auth 