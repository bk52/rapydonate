const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationTypesSchema = new Schema({
    active: Boolean,
    icon: String,
    title: String,
    price: Number,
    donateType: String
})

const urlSchema = new Schema(
    {
        active: { type: Boolean, default: true },
        title: String,
        url: String,
        verified: { type: Boolean, default: true },
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
)

const projectsSchema = new Schema(
    {
        userId: { type: String, required: true },
        ewalletId: { type: String, required: true },
        title: String,
        description: String,
        status: { type: String, default: 'active' },
        imageURL: { type: String, default: '' },
        bgColor: { type: String, default: '#fff' },
        donationTypes: [donationTypesSchema],
        urls: [urlSchema]
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
)

projectsSchema.statics.getProject = function (_id) {
    return this.findOne({ _id }).lean();
};

projectsSchema.statics.getUserProjects = function (userId) {
    return this.find({ userId }, 'title description status').lean();
};

projectsSchema.statics.createProject = async function (item) {
    try {
        if (item.projectId) {
            let p = await this.findOne({ id: item.projectId });
            if (p) {
                p.title = item.projectInfo.title;
                p.description = item.projectInfo.description;
                p.imageURL = item.projectInfo.imageURL;
                p.bgColor = item.projectInfo.bgColor;
                p.donationTypes = item.projectTypes;
                p.urls = item.projectUrls;
                p.save();
            }
            return p?._id;
        }
        else {
            let newItem = new projectsModel(item.projectInfo);
            const saveItem = await newItem.save();
            return saveItem
        }
    }
    catch (e) {
        global.log(e);
        return;
    }
};

projectsSchema.statics.deleteProject = function (_id) {
    return this.deleteOne({ _id }).lean();
}

const projectsModel = mongoose.model("projects", projectsSchema);
module.exports = projectsModel;

