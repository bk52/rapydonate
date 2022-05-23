const express = require('express');
const router = express.Router();
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const UserModel = require(`${global.serverRoot}/models/Users`);
const ProjectModel = require(`${global.serverRoot}/models/Projects`);
const { CreatePerson, CreateContact, CreateWallet, DeleteWallet } = require(`${global.serverRoot}/common/rapyd/wallet`);
const { nanoid } = require('nanoid');

router.route('/')
    .all(function (req, res, next) {
        next();
    })
    .get(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            const { projectId } = req.query;
            if (!id)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": "You need to fill personel info in Account" });

            if (projectId) {
                const project = await ProjectModel.getProject(projectId);
                return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, "data": project });
            }
            else {
                const projects = await ProjectModel.getUserProjects(id);
                return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, "data": projects });
            }
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })
    .post(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            const { projectId, projectInfo, projectTypes, projectUrls } = req.body;
            if (!id)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const userInfo = await UserModel.getUserById(id);
            if (!userInfo.contact)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": "You need to fill personel info in Account" });

            if (projectId) {
                const response = await ProjectModel.createProject({ projectId, projectInfo, projectTypes, projectUrls })
                return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, data: response });
            }
            else {
                // Create Wallet for Project
                const { first_name, last_name, email, phone_code, phone_number } = userInfo.contact;
                const ewallet_reference_id = `${first_name}-${last_name}-${nanoid(10)}`;
                const { line_1, city, state, zip, country, date_of_birth } = userInfo.contact;
                const PersonInfo = CreatePerson(first_name, last_name, email, ewallet_reference_id, ``);
                const ContactInfo = CreateContact(first_name, line_1, city, state, country, zip, date_of_birth);
                const walletId = await CreateWallet(PersonInfo, ContactInfo)

                if (!walletId)
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": "Could not create wallet" });

                // Create Project
                const { title, description } = projectInfo;
                const createdProject = await ProjectModel.createProject({
                    projectInfo: {
                        userId: id,
                        ewalletId: walletId,
                        title: title,
                        description: description
                    }
                })

                return res.status(StatusCodes.OK).json({ "message": createdProject.id });
            }
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })
    .delete(async function (req, res) {
        try {
            const { id } = req.headers.payload;
            const { projectId } = req.body;

            if (!projectId)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": ReasonPhrases.BAD_REQUEST });

            const project = await ProjectModel.getProject(projectId);
            if (!project)
                return res.status(StatusCodes.BAD_REQUEST).json({ "message": "Project not found" });

            await ProjectModel.deleteProject(projectId);
            await DeleteWallet(project.ewalletId);

            return res.status(StatusCodes.OK).json({ "message": ReasonPhrases.OK, "data": projectId });
        }
        catch (e) {
            global.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    })

module.exports = router;