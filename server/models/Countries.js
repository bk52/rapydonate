const mongoose = require("mongoose");
const { Schema } = mongoose;

const countriesSchema = new Schema(
    {
        id: Number,
        name: String,
        iso_alpha2: String,
        iso_alpha3: String,
        currency_code: String,
        currency_name: String,
        currency_sign: String,
        phone_code: String,
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
        toJSON: { virtuals: true },
    }
);

countriesSchema.statics.getCountries = function () {
    return this.find({}, 'id name iso_alpha2').lean();
};

countriesSchema.statics.setCountries = function (data) {
    return this.insertMany(data);
};

countriesSchema.statics.deleteCountries = function (data) {
    return this.deleteMany();
};

const countriesModel = mongoose.model("countries", countriesSchema);
module.exports = countriesModel;
