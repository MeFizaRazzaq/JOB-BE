const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const EmployeeModel= require('./models/employee');

// Create Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/JOB-BE');
const db = mongoose.connection;

// Set up body parser middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.get('/', (req, res) => {

   
    res.redirect('login.html');
    console.log("EMployee");
    /*
    const { name, age, position, department, salary } = req.body;
 // Create a new Employee instance
 const newEmployee = new EmployeeModel({
    name,
    age,
    position,
    department,
    salary
});

// Save the employee to the database
newEmployee.save((err, savedEmployee) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error saving employee');
    } else {
        res.status(200).send('Employee saved successfully');
    }
});

*/
});

// Start the server
app.listen(port, () => {
console.log(`Server is listening at http://localhost:${port}`);
});