const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register //
router.post("/register", async (req, res) => {
  // Destructure them variables
  const { firstname, lastname, email, password } = req.body.data;

  //Check if the user exist //
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send("Email already exist");

  // Hash the password //
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create New User //
  const user = new User({
    firstName: firstname,
    lastName: lastname,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ message: "User Registered", id: savedUser._id });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login //
router.post("/login", async (req, res) => {
  const { email, password } = req.body.data;

  // Check if user exist //
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "Email doesn't exist" });

  // Check if password is valid //
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Password is not valid" });

  // JWT //
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({ message: "User logged in", token: token });
});

module.exports = router;
