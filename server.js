// // inquirer for user prompts
const inquirer = require("inquirer");
const mysql = require("mysql2");

// create MySQL connection
const sequelize = require("./config/connection");

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

function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  sequelize.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.table(rows);
    }
  });
}
function viewRoles() {}
function viewEmployees() {}
function addDepartment() {}
function addRole() {}
function addEmployee() {}
function updateEmployeeRole() {}

init();
