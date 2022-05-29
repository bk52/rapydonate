const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const ProjectModel = require(`${global.serverRoot}/models/Projects`);
const DonateModel = require(`${global.serverRoot}/models/Donations`);

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(async function (req, res) {
        try {
            const { projectId } = req.query;
            if (!projectId)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const data = await DonateModel.getProjectDonates(projectId);
            return res.status(StatusCodes.OK).json(data);
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })
    .post(async function (req, res) {
        try {
            const { projectId, donateId, projectUrl, username, message } = req.body;
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            if (!projectId)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const project = await ProjectModel.getProject(projectId);
            if (!project)
                return res.status(StatusCodes.NOT_FOUND).json({ "message": ReasonPhrases.NOT_FOUND });

            const platform = projectUrl === 'rapydonate' ? { title: 'Rapydonate', _id: -1 } : project.urls.filter(x => x.url === projectUrl)[0];
            const selectedDonate = project.donationTypes.filter(x => x._id.toString() === donateId)[0];
            const { _id, icon, title, price, donateType } = selectedDonate;
            const msg = donateType === "message" ? message : "";
            const donateInfo = {
                ip,
                projectId,
                from: platform.title,
                fromId: platform._id,
                icon,
                title,
                price,
                donateType,
                donateId: _id,
                username,
                message: msg
            }
            await DonateModel.setDonate(donateInfo);
            return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;