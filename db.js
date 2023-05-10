const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pokemon", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
