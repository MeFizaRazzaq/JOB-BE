const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    nationality: {
        type: String,
    },
    title: {
        type: String
    },
    companyName: {
        type: String,
    },
    personalWebsite: {
        type: String
    },
    profilePicture: {
        type: Buffer // Storing the image binary data
    },
    profilePictureType: {
        type: String // This can store the URL to the image
    }
});

const EmployerModel = mongoose.model("employers", EmployerSchema);
module.exports = EmployerModel;
