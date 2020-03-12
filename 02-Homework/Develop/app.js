const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function buildTeam() {
  const res = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What the employee's role?",
      choices: ["Manager", "Engineer", "Intern"]
    },
    {
      type: "input",
      name: "name",
      message: "What is their name?"
    },
    { type: "input", name: "id", message: "What is your ID?" },
    {
      type: "input",
      name: "email",
      message: "What is theri Email?"
    }
  ]);
  const employee = new Employee([res.name, res.id, res.email]);
  switch (res.role) {
    case "Manager":
      const man = await inquirer.prompt({
        type: "input",
        name: "officeNumber",
        message: "What is their office number?"
      });
      const member = new Manager([...employee, man.officeNumber]);
      break;
    case "Engineer":
      const eng = await inquirer.prompt({
        type: "input",
        name: "github",
        message: "What is their github user name?"
      });
      const member = new Engineer([...employee, eng.github]);
      break;
    case "Intern":
      var int = await inquirer.prompt({
        type: "input",
        name: "school",
        message: "Enter intern's school"
      });
      const member = new Intern([...employee, int.school]);
      break;
  }
  console.log(member);
  team.push(member);
  let team = [];
  const addEmployee = await inquirer.prompt({
    type: "confirm",
    name: "addEmployee",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"]
  });
  addEmployee.confirm[0] ? buildTeam() : run();
}
async function run() {
  await buildTeam();
  const newTeam = render(team);
  writeFile(newTeam);
}
function writeFile(newTeam) {
  fs.existsSync(OUTPUT_DIR) ? null : fs.mkdir(OUTPUT_DIR);

  fs.writeFile(outputPath, newTeam, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your team was saved!");
  });
}
run();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
