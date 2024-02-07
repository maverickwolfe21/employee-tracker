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
        "Add a department",
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
        case "Add a department":
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
    console.table(roleData.map((role) => role.dataValues));
  } catch (err) {
    console.log(err);
  }
  init();
}
async function viewEmployees() {
  try {
    const employeeData = await Employee.findAll();
    if (!employeeData) {
      console.log("No data found!");
      return;
    }
    console.table(employeeData.map((emp) => emp.dataValues));
  } catch (err) {
    console.log(err);
  }
  init();
}
async function addDepartment() {
  try {
    const response = await inquirer.prompt({
      type: "input",
      name: "deptName",
      message: "Please enter the name of the department:",
    });

    if (response) {
      const newDept = await Department.create({ name: response.deptName });
      if (newDept) {
        console.log("Department added successfully!");
      }
    }
  } catch (err) {
    console.log(err);
  }
  init();
}

async function addRole() {
  const departmentData = await Department.findAll();
  const departments = departmentData.map((dep) => {
    return { id: dep.dataValues.id, name: dep.dataValues.name };
  });

  try {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Please enter the name of the role:",
      },
      {
        type: "number",
        name: "roleSalary",
        message: "Please enter the salary of the role (number):",
      },
      {
        type: "list",
        choices: departments.map((item) => item.name),
        name: "roleDept",
        message: "Which department does this role belong to?",
      },
    ]);

    if (response) {
      const newRole = await Role.create({
        title: response.roleTitle,
        salary: response.roleSalary,
        department_id: departments.find((item) => item.name === response.roleDept).id,
      });
      if (newRole) {
        console.log("Role added successfully!");
      }
    }
  } catch (err) {
    console.log(err);
  }
  init();
}
async function addEmployee() {
  const roleData = await Role.findAll();
  const roles = roleData.map((role) => {
    return { id: role.dataValues.id, title: role.dataValues.title };
  });
  const employeeData = await Employee.findAll();
  const employees = employeeData.map((emp) => {
    return { id: emp.dataValues.id, name: emp.dataValues.first_name + " " + emp.dataValues.last_name };
  });

  try {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        choices: roles.map((item) => item.title),
        name: "roleTitle",
        message: "Please select the employee's role:",
      },
      {
        type: "list",
        choices: employees.map((item) => item.name),
        name: "manager",
        message: "Please select the employee's manager:",
      },
    ]);

    if (response) {
      const newRole = await Employee.create({
        first_name: response.firstName,
        last_name: response.lastName,
        title: response.roleTitle,
        salary: response.roleSalary,
        role_id: roles.find((item) => item.title === response.roleTitle).id,
        manager_id: employees.find((item) => item.name === response.manager).id,
      });
      if (newRole) {
        console.log("Role added successfully!");
      }
    }
  } catch (err) {
    console.log(err);
  }
  init();
}
async function updateEmployeeRole() {
  const employeeData = await Employee.findAll();
  const employees = employeeData.map((emp) => {
    return { id: emp.dataValues.id, name: emp.dataValues.first_name + " " + emp.dataValues.last_name };
  });
  const roleData = await Role.findAll();
  const roles = roleData.map((role) => {
    return { id: role.dataValues.id, title: role.dataValues.title };
  });

  try {
    const response = await inquirer.prompt([
      {
        type: "list",
        choices: employees.map((item) => item.name),
        name: "employee",
        message: "Which employee would you like to modify?",
      },
      {
        type: "list",
        choices: roles.map((item) => item.title),
        name: "roleTitle",
        message: "Which role would you like to switch to?",
      },
    ]);

    if (response) {
      const newRole = await Employee.update(
        {
          role_id: roles.find((item) => item.title === response.roleTitle).id,
        },
        {
          where: {
            id: employees.find((item) => item.name === response.employee).id,
          },
        }
      );
      if (newRole) {
        console.log("Role updated successfully!");
      }
    }
  } catch (err) {
    console.log(err);
  }
  init();
}

init();
