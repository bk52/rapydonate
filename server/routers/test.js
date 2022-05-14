const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Encryption, Decryption } = require(`${global.serverRoot}/common/Encryption`);
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const UserModel = require(`${global.serverRoot}/models/Users`);

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(async function (req, res) {
        try {
            res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;