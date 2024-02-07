const sequelize = require("../config/connection");
const { Department, Role, Employee } = require("../models");

const departmentData = require("./departmentData.js");
const roleData = require("./roleData.js");
const employeeData = require("./employeeData.js");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentData, {
    individualHooks: true,
    returning: true,
  });

  const roles = await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

  const employees = await Employee.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
