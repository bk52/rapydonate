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
            const { username, password } = req.body;
            if (!(username && password))
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const decPassword = Decryption(password, process.env.AES_API_KEY);
            const encPassword = Encryption(decPassword, process.env.AES_DB_KEY);
            const userInfo = await UserModel.getUser(username, encPassword);

            if (!userInfo)
                return res.status(StatusCodes.NOT_FOUND).json({ "message": ReasonPhrases.NOT_FOUND });

            const payload = {
                id: userInfo._id.toString(),
                permission: userInfo.permission
            }

            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
            })

            let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE)
            })

            res.status(StatusCodes.OK).json({
                "accessToken": accessToken,
                "refreshToken": refreshToken
            })
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;