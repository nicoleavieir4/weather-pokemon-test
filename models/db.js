const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("localhost", {
  host: "localhost",
  dialect: "mysql2"
});


