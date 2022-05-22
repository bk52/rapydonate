const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const UserModel = require(`${global.serverRoot}/models/Users`);
const { CreatePerson, CreateContact, CreateWallet } = require(`${global.serverRoot}/common/rapyd/wallet`);
const { nanoid } = require('nanoid');

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            const { title } = req.body;
            if (!(id && title))
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const userInfo = await UserModel.getUserById(id);
            if (!userInfo.contact)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": "You need to fill personel info in Account" });

            // Create Wallet for Project
            const { first_name, last_name, email, phone_code, phone_number } = userInfo.contact;
            const ewallet_reference_id = `${first_name}-${last_name}-${nanoid(10)}`;
            const { line_1, city, state, zip, country, date_of_birth } = userInfo.contact;
            const PersonInfo = CreatePerson(first_name, last_name, email, ewallet_reference_id, '');
            const ContactInfo = CreateContact(first_name, line_1, city, state, country, zip, date_of_birth);
            const walletId = await CreateWallet(PersonInfo, ContactInfo)



            return res.status(StatusCodes.OK).json({ "message": walletId });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;