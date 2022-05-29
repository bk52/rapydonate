const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationSchema = new Schema(
    {
        ip: String,
        projectId: String,
        from: String,
        fromId: String,
        icon: String,
        title: String,
        price: Number,
        donateType: String,
        donateId: String,
        username: String,
        message: String
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
)

donationSchema.statics.getProjectDonates = function (projectId) {
    return this.find({ projectId }, 'ip from icon price donateType username message createdDate')
        .sort([['createdDate', -1]])
        .lean();
}

donationSchema.statics.setDonate = async function (item) {
    let newItem = new DonateModel(item);
    const saveItem = await newItem.save();
    return saveItem
}

const DonateModel = mongoose.model("donates", donationSchema);
module.exports = DonateModel;