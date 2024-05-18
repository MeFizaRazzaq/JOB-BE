const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const EmployeeModel= require('./models/employee');
const EmployerModel=require('./models/employer');
const JObModel=require('./models/jobSchema');
const jobModel = require('./models/jobSchema');

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/JOB-BE');
const db = mongoose.connection;

// Set up body parser middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Route to handle form submission
app.get('/', (req, res) => {

    
    res.sendFile(path.join(__dirname,'homepage.html'));
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



//form registration for employeee
app.post('/Employee-Register',async (req, res) => {
    try {
        const newRegistration = new EmployeeModel({
            email: req.body.email,
            password: req.body.password
        });

        await newRegistration.save();  // Use async/await instead of a callback
        //res.send('Registration successful');
        res.sendFile(path.join(__dirname,'employeeProfile.html'));
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//registration form for employeer
app.post('/Employer-Register',async (req, res) => {
    try {
        const newRegistration = new EmployerModel({
            email: req.body.email,
            password: req.body.password
        });

        await newRegistration.save();  // Use async/await instead of a callback
        //res.send('Registration successful');
        res.sendFile(path.join(__dirname,'employerProfile.html'));
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//registration form for employeer
app.post('/login-form',async (req, res) => {
    
    try {
            const e= await SearchOneEmployee(req.body.email,req.body.password);
            console.log("e",e);
            if(e==null){
                const er= await SearchOneEmployeer(req.body.email,req.body.password);
                console.log("er",er);
                if(er==null){
                    res.sendFile(path.join(__dirname,'login.html'));
                }else{
                    res.sendFile(path.join(__dirname,'employerDashboard.html'));
                }
                
            }else{
                res.sendFile(path.join(__dirname,'employeeDashboard.html'));
            }
            
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//job post form for employeer
app.post('/jobPost',async (req, res) => {
    console.log("JOB",req.body);
    try {
        const newJob = new jobModel({
            jobTitle: req.body.jobTitle,
            companyName: req.body.companyName,
            jobType: req.body.jobType,
            jobDescription: req.body.jobDescription,
            location: req.body.jobLocation,
            date: req.body.applicationDeadline,
        });

        await newJob.save();  // Use async/await instead of a callback
        //res.send('Registration successful');
        res.sendFile(path.join(__dirname,'employerDashboard.html'));
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

// Start the server
app.listen(port, () => {
console.log(`Server is listening at http://localhost:${port}`);
});

const SearchOneEmployee= async  (email,p)=>{
    console.log("employee mai:",email,p);
    let emp = await EmployeeModel.findOne({ email: email });
    console.log("e in func",emp);
    if(emp!=null){

        console.log("employee",emp.password);
        if(emp.password==p){
            return emp; 
        }else{
            return null;
        }
           
    }else{
        console.log("employee not found");
        return null;
    }
}

const SearchOneEmployeer= async  (e,p)=>{
    let emp = await EmployerModel.findOne({ email: e });
    console.log("employeer",emp);
    if(emp!=null){
        console.log("employee",emp.password);
        if(emp.password==p){
            return emp;
        }else{
            return null;
        }
           
    }else{
        console.log("employer not found");
        return null;
    }
}
