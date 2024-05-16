// Define the Employee class
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