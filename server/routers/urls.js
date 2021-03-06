const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const ProjectModel = require(`${global.serverRoot}/models/Projects`);

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .post(async function (req, res) {
        try {
            const { siteUrl, projectId } = req.body;
            if (!(siteUrl || projectId))
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            if (siteUrl) {
                const project = await ProjectModel.getProjectByUrl(siteUrl);
                if (!project)
                    return res.status(StatusCodes.NOT_FOUND).json({ "message": ReasonPhrases.NOT_FOUND });

                return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, project });
            }
            else if (projectId) {
                const project = await ProjectModel.getProjectById(projectId);
                if (!project)
                    return res.status(StatusCodes.NOT_FOUND).json({ "message": ReasonPhrases.NOT_FOUND });

                return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, project });
            }
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;