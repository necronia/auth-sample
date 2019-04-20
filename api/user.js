const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const util = require('../util');

router.get('/', util.isLoggedin, (req, res) => {
    userModel.findAll()
        .then(user => res.json(user))
        .catch((err) => {
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    userModel.create({
            userId: req.body.userId,
            password: util.hash(req.body.password)
        }).then((user) => {
            return res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

router.get('/:userId', util.isLoggedin, checkPermission, (req, res) => {
    userModel.findOne({
        where: {
            userId: req.params.userId
        }
    }).then(user => {
        return res.json(user);
    }).catch((err) => {
        res.status(500).json(err)
    });
});

module.exports = router;

function checkPermission(req, res, next) {
    userModel.findOne({
        where: {
            userId: req.params.userId
        }
    }).then((user) => {
        if (!req.decoded || user.userId != req.decoded.userId)
            return res.json({
                'msg': 'Only the user who logged in can inquire own information'
            });
        else next();
    });
}