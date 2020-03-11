// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern extends Employee {
  constructor(name, id, email, school) {
    //inherited from Employee
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    console.log(`school: ${this.school}`);
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
