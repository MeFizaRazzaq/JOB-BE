const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./Routes/route');
// Create Express app
const app = express();
const port = 3000;


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/JOB-BE');
const db = mongoose.connection;

// Set up body parser middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/', routes);

//code to implement modules
/*classes
class Employee{
    constructor(mail,pass){
        this.email=mail;
        this.password=pass;
    }
    set_Profile(){
        console.log("Do Nothing");
    }
}*/

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    });