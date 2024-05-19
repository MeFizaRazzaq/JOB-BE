// In your routes file or main server file (e.g., server.js or route.js)
const express = require('express');
const router = express.Router();

const EmployeeModel= require('../models/employee');
const EmployerModel=require('../models/employer');
const JObModel=require('../models/jobSchema');
const jobModel = require('../models/jobSchema');
const Employee = require('../js/components');
const ChattModel= require('../models/chatting');

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

// Route to handle registration choice
router.get('/register_choice', (req, res) => {
    res.render('register_choice');
    //res.sendFile(path.join(__dirname,'homepage.html'));
    console.log("EMployee");
});

//form registration for employeee
router.get('/Employee-Register',async (req, res) => {
    try {
        res.render('employee-registration')
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
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
        emp=newRegistration;
        res.render('employeeProfile',{newRegistration});
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//BUild Profile for employee
router.post('/Employee-Profile',async (req, res) => {
    try {
        console.log("req",req.body);
        mail=req.body.email;
        a=req.body.name;
        console.log("n,e",a,mail);
        let employee = await SearchOneEmployee(mail,a);
        //emp.upd_name(mail,a);
        let employeeupd = await EmployeeModel.findOneAndUpdate({ mail },{a});
        res.render('employeeDashboard',{a});
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//dashboard for employee
router.get('/Employee-Dash',async (req, res) => {
    try {  
        a="FIZA RAZZAQ";
        res.render('employeeDashboard',{a});
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//registration form for employeer
router.get('/Employer-Register',async (req, res) => {
    try {     
        res.render('employer-registration');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//registration form for employeer
router.post('/Employer-Register',async (req, res) => {
    try {
        
        const newempRegistration = new EmployerModel({
            email: req.body.email,
            password: req.body.password
        });
        console.log("employeer reg",newempRegistration);
        await newempRegistration.save();  // Use async/await instead of a callback
        //res.send('Registration successful');
        res.render('employerProfile');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//BUild Profile for employee
router.post('/Employer-Profile',async (req, res) => {
    try {
        console.log("req",req.body);
        mail=req.body.email;
        a=req.body.name;
        console.log("n,e",a,mail);
        let employee = await SearchOneEmployee(mail,a);
        //emp.upd_name(mail,a);
        let employeeupd = await EmployeeModel.findOneAndUpdate({ mail },{a});
        res.render('employerDashboard',{a});
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//registration form for employeer
router.post('/login-form',async (req, res) => {   
    try {
            const em= await SearchOneEmployee(req.body.email);
            //console.log("e",e);
            const e=vpass(em.password,req.body.password);
            emp=em;
            console.log("emp",emp);
            if(e==null){
                const emr= await SearchOneEmployeer(req.body.email,req.body.password);
                //console.log("er",er);
                const er=vpass(emr.password,req.body.password);
                if(er==null){
                    res.render('login');
                }else{
                    res.render('employerDashboard');
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


const SearchOneEmployee= async  (email)=>{
    console.log("employee mai:",email);
    let emp = await EmployeeModel.findOne({ email: email });
    if(emp!=null){
        console.log("seached employee",emp);
        return emp;   
    }else{
        console.log("employee not found");
        return null;
    }
}

const SearchOneEmployeer= async  (e,p)=>{
    let emp = await EmployerModel.findOne({ email: e });
    console.log("employeer",emp);
    if(emp!=null){
        console.log("seached employee",emp);
        return emp;   
    }else{
        console.log("employee not found");
        return null;
    }
}

const vpass= (e,p)=>{  
        if(e==p){
            return true; 
        }else{
            return false;
        }
}

//about page
router.get('/testimonial',async (req, res) => {
    try {     
        res.render('testimonial');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//edit profile page
router.get('/edit-Profile-Employee',async (req, res) => {
    try {     
        res.render('employeeEDITprofile');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//edit profile page
router.get('/Employee-Payment',async (req, res) => {
    try {     
        res.render('employeePaymentDetails');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});

//contact us page
router.get('/Contact',async (req, res) => {
    try {     
        res.render('contact');
    } catch (err) {
        if (!res.headersSent) {  // Check if headers are already sent
            res.status(500).send('Error occurred while saving to database');
        }
    }
});
module.exports = router;
