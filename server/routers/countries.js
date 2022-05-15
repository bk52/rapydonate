const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const CountriesModel = require(`${global.serverRoot}/models/Countries`);

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(async function (req, res) {
        try {
            const data = await CountriesModel.getCountries()
            res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, data });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;