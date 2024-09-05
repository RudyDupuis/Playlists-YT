const express = require("express");
const authRoutes = require("./routes/auth");
const sequelize = require("./dbconfig");
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://127.0.0.1:4200",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Angular initiation backend");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`App listening at http://localhost:${port}`);
});
