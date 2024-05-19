// In your routes file or main server file (e.g., server.js or route.js)
const express = require('express');
const router = express.Router();

const EmployeeModel= require('../models/employee');
const EmployerModel=require('../models/employer');
const JObModel=require('../models/jobSchema');
const jobModel = require('../models/jobSchema');
const Employee = require('../js/components');

// Route to render login page
router.get('/login', (req, res) => {
    res.render('login');  // This will render login.ejs from your views directory
});

//global user
let emp= new Employee();

// Route to handle form submission
router.get('/', (req, res) => {
    res.render('homepage');
    //res.sendFile(path.join(__dirname,'homepage.html'));
    console.log("EMployee");
});




//form registration for employeee
router.post('/Employee-Register',async (req, res) => {
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
router.post('/Employer-Register',async (req, res) => {
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
router.post('/login-form',async (req, res) => {
    
    try {
            const e= await SearchOneEmployee(req.body.email,req.body.password);
            //console.log("e",e);
            emp=e;
            console.log("emp",emp);
            if(e==null){
                const er= await SearchOneEmployeer(req.body.email,req.body.password);
                //console.log("er",er);
                if(er==null){
                    res.sendFile(path.join(__dirname,'login.html'));
                }else{
                    res.sendFile(path.join(__dirname,'employerDashboard.html'));
                }
                
            }else{
                let a=emp.email;
                res.render('employeeDashboard',{a});
                //res.sendFile(path.join(__dirname,'employeeDashboard.html'));
            }
            
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//job post form for employeer
router.post('/jobPost',async (req, res) => {
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




module.exports = router;
