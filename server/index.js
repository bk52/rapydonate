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
const urlRouter = require("./routers/urls");
const checkoutRouter = require("./routers/checkout");
const rapydCountriesRouter = require("./routers/countries");
const paymentMethodsRouter = require("./routers/paymentMethods");
const donationsRouter = require("./routers/donations");

const authMiddleware = require("./controller/auth/verifyToken");
const apiKeyMiddleware = require("./controller/auth/apiKeyCheck");

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
        app.use("/api/checkout", apiKeyMiddleware, checkoutRouter);
        app.use("/api/donations", apiKeyMiddleware, donationsRouter);
        app.use("/api/paymentmethods", apiKeyMiddleware, paymentMethodsRouter);
        app.use("/api/urls", apiKeyMiddleware, urlRouter);

        app.get('*', function (req, res) {
            res.sendFile(path.join(global.appRoot, "client/dist/index.html"), function (err) {
                if (err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
                }
            })
        })
        app.listen(PORT, (output) => { console.log("Server started port : " + PORT); });
    }
    catch (e) {
        global.log(`Error : ${e}`);
    }
}

Init();

