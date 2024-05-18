const mongoose = require("mongoose");

const EmployeeSchema =  mongoose.Schema({
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
        required: true
    },
    nationality: {
        type: String
    },
    title: {
        type: String
    },
    experience: {
        type: String
    },
    skill: {
        type: String
    },
    education: {
        type: String
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

const EmployeeModel = mongoose.model("employes", EmployeeSchema);
module.exports = EmployeeModel;