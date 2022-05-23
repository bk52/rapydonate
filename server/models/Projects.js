const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationTypesSchema = new Schema({
    active: Boolean,
    icon: String,
    title: String,
    price: Number,
})

const projectsSchema = new Schema(
    {
        userId: { type: String, required: true },
        ewalletId: { type: String, required: true },
        title: String,
        description: String,
        status: { type: String, default: 'active' },
        imageURL: String,
        bgColor: String,
        donationTypes: [donationTypesSchema],

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
        let newItem = new projectsModel(item);
        const saveItem = await newItem.save();
        return saveItem
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

