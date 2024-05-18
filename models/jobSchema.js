const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
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

const jobModel = mongoose.model("Job", jobSchema);
module.exports = jobModel;