const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const util = {

    hash: (string) => {
        return crypto.createHash("sha512").update(string + process.env.SHA_SALT).digest("base64");
    },

    isLoggedin: (req, res, next) => {
        let token = req.headers['x-access-token'];
        if (!token) return res.json({
            'msg': 'token is required!'
        });
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.json({
                    'err': err
                });
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    }
};

module.exports = util;