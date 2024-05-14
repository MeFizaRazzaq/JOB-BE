const mongoose = require("mongoose");

const EmployerSchema = new mongoose({
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
        type: String // This can store the URL to the image
    }
});

const EmployerModel = mongoose.model("Employer", EmployerSchema);
module.exports = EmployerModel;