const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const ProjectModel = require("../models/Projects");
const CreateCheckoutPage = require("../common/rapyd/checkout");

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(async function (req, res) {
        try {
            const { projectId, donateTypeId, countryCode, countryCurrency, paymentMethod } = req.body;

            if (!(projectId && donateTypeId && countryCode && paymentMethod))
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const project = await ProjectModel.getProject(projectId);
            if (!project)
                return res.status(StatusCodes.NOT_FOUND).json({ "message": ReasonPhrases.NOT_FOUND });

            const donationType = project.donationTypes.filter(x => x._id == donateTypeId)[0];

            const paymentInfo = {
                paymentAmount: donationType.price,
                paymentCurrency: "USD",
                buyerCountry: countryCode,
                buyerCurrency: countryCurrency,
                customerId: project.userId,
                ewalletId: project.ewalletId,
                paymentMethod: paymentMethod,
                lang: "en"
            }

            const checkoutId = await CreateCheckoutPage(paymentInfo);
            return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, data: checkoutId });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;