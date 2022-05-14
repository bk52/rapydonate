const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        name: String,
        permission: { type: Number, default: 0 },
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
);

userSchema.statics.getUser = function (username, password) {
    return this.findOne({ username, password }).lean();
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

