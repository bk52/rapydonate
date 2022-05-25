const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const apiKeyCheck = (req, res, next) => {
    try {
        let apiKey = req.headers['apikey'];
        if (apiKey && apiKey == process.env.API_HEADER_KEY)
            return next();

        return res.status(StatusCodes.UNAUTHORIZED).json({ "message": ReasonPhrases.UNAUTHORIZED });
    }
    catch (e) {
        global.log(e, __filename, 'e', "verify");
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
}

module.exports = apiKeyCheck;