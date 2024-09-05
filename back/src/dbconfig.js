const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "express_dev_db",
  "userenclair!cestpasbien",
  "motdepasseenclair!cestpasbien",
  {
    host: "db",
    dialect: "postgres",
  }
);

module.exports = sequelize;
