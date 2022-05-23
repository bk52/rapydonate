const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema(
    {
        userId: { type: String, required: true },
        projectId: { type: String, required: true },
        active: { type: Boolean, default: true },
        name: String,
        url: String,
        active: { type: Boolean, default: true },
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
)

urlSchema.statics.deleteProject = function (projectId) {
    return this.deleteMany({ projectId }).lean();
}

const urlModel = mongoose.model("urls", urlSchema);
module.exports = urlModel;