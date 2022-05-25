const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { PaymentMethodsCategoryByCountry } = require("../common/rapyd/paymentMethodsByCountry");

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(async function (req, res) {
        try {
            const { countryCode } = req.body;
            if (!countryCode)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const data = await PaymentMethodsCategoryByCountry(countryCode);
            res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, data });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;