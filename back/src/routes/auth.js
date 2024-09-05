const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Enregistrement réussi", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = "uneclesecretepastressecrete!";

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Ce compte n'existe pas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Ce compte n'existe pas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite", error });
  }
});

module.exports = router;
