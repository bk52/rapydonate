const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const verify = (minAuthLevel = 0) => {
    return (req, res, next) => {
        try {
            let token = req.headers['authorization'].split(' ')[1];
            if (token && token !== "") {
                let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if (!(payload.permission && payload.permission >= minAuthLevel))
                    return res.status(StatusCodes.UNAUTHORIZED).json({ "message": ReasonPhrases.UNAUTHORIZED });
                req.headers.payload = payload;
                next();
            }
            else {
                res.status(StatusCodes.UNAUTHORIZED).json({ "message": ReasonPhrases.UNAUTHORIZED });
            }
        }
        catch (e) {
            global.log(e, __filename, 'e', "verify");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}

module.exports = verify;


