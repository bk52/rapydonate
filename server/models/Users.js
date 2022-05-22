const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        phone_code: String,
        phone_number: String,
        country: String,
        date_of_birth: String,
        line_1: String,
        city: String,
        state: String,
        zip: String,
        country_by_id: String,
        phone_code_by_id: String
    }
)

const userSchema = new Schema(
    {
        username: String,
        password: String,
        name: String,
        permission: { type: Number, default: 0 },
        contact: contactSchema
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
);

userSchema.statics.getUser = function (username, password) {
    return this.findOne({ username, password }).lean();
};

userSchema.statics.getUserById = function (_id) {
    return this.findOne({ _id }).lean();
};

userSchema.statics.setAccount = async function (_id, accountInfo) {
    try {
        const user = await this.findOne({ _id });
        if (!user)
            throw "User not found";
        user.contact = accountInfo;
        user.save();
    }
    catch (e) {
        global.log(e);
    }
    return;
}

userSchema.statics.getAccount = function (_id) {
    return this.findOne({ _id }, 'id contact').lean();
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

