/* Define the Employee class
class Employee {
    // Constructor to initialize employee properties
    constructor(name, age, position, department, salary) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.department = department;
        this.salary = salary;
    }

    // Method to display employee information
    displayInfo() {
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Position: " + this.position);
        console.log("Department: " + this.department);
        console.log("Salary: $" + this.salary);
    }
}
*/


const EmployeeModel=require('../models/employer');
//classes
const emp =class Employee{
    constructor(mail,pass){
        this.email=mail;
        this.password=pass;
    }
    async upd_name(n,e){
        let employee = await EmployeeModel.findOne({ e });
        console.log("in component:",n,e,employee);
        if (employee) {
            let employeeupd = await EmployeeModel.findOneAndUpdate({ e },{n});
        }
    }
    set_Profile(name,nationality,title,exp, skill, edu, url){
        this.fullName=name;
        this.nationality=nationality;
        this.title=title;
        this.experience=exp;
        this.skill=skill;
        this.education=edu;
        this.personalWebsite=url;
       // this.profilePicture=pic;
       // this.fullName=cv;

    }
}

module.exports=emp;