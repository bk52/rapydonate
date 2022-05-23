require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const mongoSanitize = require("express-mongo-sanitize");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const PORT = process.env.PORT || 5000;
const app = express();
const connStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qmtm0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
};
global.serverRoot = path.resolve(__dirname);
const PERMISSIONS = require('./common/PermissionLevels');
global.log = (msg) => { console.log(msg) }

const authRouter = require("./routers/auth");
const testRouter = require("./routers/test");
const accountRouter = require("./routers/account");
const tokenRouter = require("./routers/token");
const projectRouter = require("./routers/projects");
const rapydCountriesRouter = require("./routers/countries");

const authMiddleware = require("./controller/auth/verifyToken");
const apiKeyMiddleware = require("./controller/auth/apiKeyCheck");

const listCountries = require("./common/rapyd/listCountries");
const CountriesModel = require("./models/Countries");
const CreateCheckoutPage = require("./common/rapyd/checkout");
const { IsMethodAvailable } = require("./common/rapyd/paymentMethodsByCountry");
const { CreatePerson, CreateContact, CreateWallet, DeleteWallet } = require("./common/rapyd/wallet");
const { PAYMENT_METHODS } = require("./common/rapyd/enums");
const GetIdentities = require("./common/rapyd/identities");
const { Decryption } = require("./common/Encryption");

const projectsModel = require("./models/Projects");

const Init = async () => {
    try {
        await mongoose.connect(connStr, connParams)
        app.use(bodyParser.json());
        app.use(cors());
        app.use(mongoSanitize({ replaceWith: "_" }));
        app.use(express.static(path.join(global.appRoot, "client/dist")));
        app.use("/api/auth", authRouter);
        app.use("/api/token", tokenRouter);
        app.use("/api/test", authMiddleware(PERMISSIONS.ADMIN), testRouter);
        app.use("/api/projects", authMiddleware(PERMISSIONS.ADMIN), projectRouter);
        app.use("/api/account", authMiddleware(PERMISSIONS.ADMIN), accountRouter);
        app.use("/api/countries", apiKeyMiddleware, rapydCountriesRouter);

        app.get('*', function (req, res) {
            res.sendFile(path.join(global.appRoot, "client/dist/index.html"), function (err) {
                if (err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
                }
            })
        })
        app.listen(PORT, (output) => { console.log("Server started port : " + PORT); });

        // const res = await projectsModel.createProject({
        //     userId: "userId",
        //     ewalletId: "ewallet",
        //     name: "name",
        //     description: "description",
        //     imageURL: "imageURL",
        //     bgColor: "bgColor",
        // })
        // console.log(res);

        // const res = Decryption("J4c6jaWEHTeEtSfEa0y5jw==", process.env.AES_DB_KEY);
        // console.log(res);
        ////// CHECKOUT PAGE
        // const settingsCheckout = {
        //     paymentAmount: 30,
        //     paymentCurrency: "USD",
        //     buyerCountry: "TR",
        //     buyerCurrency: "TRY",
        //     customerId: "abcdef",
        //     remoteId: "abc",
        //     ewalletId: "ewallet_31a1c7ba54e80f6798c296b5abb46fb3",
        //     lang: "en"
        // }
        // const checkoutId = await CreateCheckoutPage(settingsCheckout);
        // console.log(checkoutId);

        ////// PAYMENT METHOD CHECK
        // const res = await IsMethodAvailable("TR", PAYMENT_METHODS.card);
        // console.log(res);

        ////// CREATE WALLET
        // const person = CreatePerson();
        // const contact = CreateContact();
        // person.first_name = "Barisa";
        // person.last_name = "K.";
        // person.phone_number = "+905333228045";
        // person.ewallet_reference_id = "Barisa-k-02135";
        // person.email = "bk@hotmail.com";

        // contact.phone_number = "+905333228045";
        // contact.email = "bk@hotmail.com";
        // contact.first_name = "Barisa";
        // contact.last_name = "K.";
        // contact.mothers_name = "Marry";
        // contact.address.name = "AdressName";
        // contact.address.line_1 = "AdressLine1";
        // contact.address.country = "US";
        // contact.address.zip = "123";
        // contact.identification_type = "PA";
        // contact.identification_number = "123456";
        // contact.date_of_birth = "06/23/1990";
        // contact.nationality = "US";
        // const ewalletId = await CreateWallet(person, contact);
        // console.log(ewalletId);

        //DELETE WALLET
        // const res = await DeleteWallet("ewallet_43440bf9c393c0b154d696231f84118d");
        // console.log(res);

        //GET Identities
        // const res = await GetIdentities("TR");
        // console.log(res);

    }
    catch (e) {
        global.log(`Error : ${e}`);
    }
}

Init();

