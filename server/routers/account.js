const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const UserModel = require(`${global.serverRoot}/models/Users`);

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            if (!id)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const data = await UserModel.getAccount(id);
            return res.status(StatusCodes.OK).json({ ...data });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })
    .post(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            const { accountInfo } = req.body;
            if (!(id && accountInfo))
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            await UserModel.setAccount(id, accountInfo);
            return res.status(StatusCodes.OK).json({ "message": "" });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;