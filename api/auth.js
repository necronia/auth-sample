const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const util = require('../util');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    userModel.findOne({
            where: {
                userId: req.body.userId,
                password: util.hash(req.body.password)
            }
        })
        .then((user, err) => {
            if (err) return res.json({
                'error': err
            });
            else if (user == null) return res.json({
                'error': 'login fail'
            });
            else {
                let payload = {
                    userId: user.userId
                };
                let secretOrPrivateKey = process.env.JWT_SECRET;
                let options = {
                    expiresIn: 60 * 60 * Number(process.env.tokenEffectiveTime)
                };

                jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
                    if (err) return res.json({
                        'error': err
                    });
                    res.json({
                        'token': token
                    });
                });
            }
        });
});

router.get('/me', util.isLoggedin, (req, res) => {

    userModel.findOne({
            where: {
                userId: req.decoded.userId,
            }
        })
        .then((user, err) => {
            if (err || !user) return res.json({
                'error': err
            });
            res.json({
                'user': user
            });
        });
});

router.get('/refresh', util.isLoggedin, (req, res) => {
    userModel.findOne({
            where: {
                userId: req.decoded.userId,
            }
        })
        .then((user, err) => {
            if (err) return res.json({
                'error': err
            });
            else {
                let payload = {
                    userId: user.userId
                };
                let secretOrPrivateKey = process.env.JWT_SECRET;
                let options = {
                    expiresIn: 60 * 60 * Number(process.env.tokenEffectiveTime)
                };

                jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
                    if (err) return res.json({
                        'error': err
                    });
                    res.json({
                        'token': token
                    });
                });
            }
        });
});

module.exports = router;