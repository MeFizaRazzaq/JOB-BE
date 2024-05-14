const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
    
});

const EmployerModel = mongoose.model("Employer", EmployerSchema);
module.exports = EmployerModel;