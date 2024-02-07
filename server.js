// // inquirer for user prompts
const inquirer = require("inquirer");
//import sequelize models
const { Department, Employee, Role } = require("./models");

// prompt for user input with inquirer
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add an department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.start) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add an department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          process.exit(0);
      }
    });
}

async function viewDepartments() {
  try {
    const deptData = await Department.findAll();
    if (!deptData) {
      console.log("No data found!");
      return;
    }
    console.table(deptData.map((dep) => dep.dataValues));
  } catch (err) {
    console.log(err);
  }
  init();
}
async function viewRoles() {
  try {
    const roleData = await Role.findAll();
    if (!roleData) {
      console.log("No data found!");
      return;
    }
    console.log(roleData.map((role) => role.dataValues));
  } catch (err) {
    console.log(err);
  }
  init();
}
function viewEmployees() {}
function addDepartment() {}
function addRole() {}
function addEmployee() {}
function updateEmployeeRole() {}

init();
