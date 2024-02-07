// import and initialize models

const User = require("./User");
const Comment = require("./Comment");
const Ingredient = require("./Ingredient");
const Recipe = require("./Recipe");

// users have many recipes
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

// users have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// recipes have many ingredients
Recipe.hasMany(Ingredient, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
});
Ingredient.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

// recipes have many comments
Recipe.hasMany(Comment, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

module.exports = { User, Comment, Ingredient, Recipe };
