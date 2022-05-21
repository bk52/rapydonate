const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(function (req, res) {
        try {
            let refreshToken = req.body.token;
            if (refreshToken && refreshToken !== "") {
                let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                delete payload["iat"];
                delete payload["exp"];
                let newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
                });
                let userId = payload.id.toString();
                res.status(StatusCodes.OK).json({ token: newAccessToken });
            }
            else {
                res.status(StatusCodes.UNAUTHORIZED).json({ "message": ReasonPhrases.UNAUTHORIZED });
            }
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;

