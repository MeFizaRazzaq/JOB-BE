const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    jobType: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
    }
});

const EmployerModel = mongoose.model("Employer", EmployerSchema);
module.exports = EmployerModel;