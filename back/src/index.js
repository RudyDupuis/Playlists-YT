const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  "express_dev_db",
  "userenclair!cestpasbien",
  "motdepasseenclair!cestpasbien",
  {
    host: "db",
    dialect: "postgres",
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`App listening at http://localhost:${port}`);
});
