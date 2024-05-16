const mongoose = require("mongoose");

const EmployeeSchema =  mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nationality: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    experience: {
        type: String,
    },
    skill: {
        type: String,
    },
    education: {
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

const EmployeeModel = mongoose.model("Employer", EmployeeSchema);
module.exports = EmployeeModel;