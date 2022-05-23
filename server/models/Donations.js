const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationSchema = new Schema(
    {
        ip: String,
        first_name: String,
        last_name: String,
        message: String,
        donateType: String,
        projectId: String,
        userId: String
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
)

donationSchema.statics.getProjectDonates = function (projectId) {
    return this.find({ projectId }).lean();
}

donationSchema.static.setDonate = async function (item) {
    let newItem = new DonateModel(item);
    const saveItem = await newItem.save();
    return saveItem
}

const DonateModel = mongoose.model("donates", donationSchema);
module.exports = DonateModel;