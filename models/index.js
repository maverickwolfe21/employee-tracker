// import and initialize models
const Department = require("./department");
const Employee = require("./employee");
const Role = require("./role");

// departments have many roles
Department.hasMany(Role, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});
Role.belongsTo(Department, {
  foreignKey: "department_id",
});

// employees have one role
Employee.hasOne(Role, {
  foreignKey: "role_id",
});
// employees have one manager
Employee.hasOne(Employee, {
  foreignKey: "manager_id",
});

module.exports = { Department, Employee, Role };
