const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER NEW USERS
 *
 * Can be used to register new users to the system
 *
 * ROUTE: PUBLIC
 * URL: /api/auth/register
 */

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, gender, dob, password } = req.body.data;

  //Check if the user exist //
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exist" });

  // Hash the password //
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Calculate user age //
  let currDay = new Date();
  let userDob = new Date(dob);
  let userAge = currDay.getFullYear() - userDob.getFullYear();
  let m = currDay.getMonth() - userDob.getMonth();
  if (m < 0 || (m === 0 && currDay.getDate() < userDob.getDate())) {
    userAge--;
  }

  // Assign Avatar
  const getAvatar = () => {
    if (userAge >= 60) {
      if (gender === "Male") {
        return "grandpa.png";
      }
      return "grandma.png";
    }
    if (userAge >= 30) {
      if (gender === "Male") {
        return "man.png";
      }
      return "woman.png";
    }
    if (userAge >= 18) {
      if (gender === "Male") {
        return "teenboy.png";
      }
      return "teengirl.png";
    } else {
      if (gender === "Male") {
        return "boy.png";
      }
      return "girl.png";
    }
  };

  // Create New User //
  const user = new User({
    firstName: firstname,
    lastName: lastname,
    email,
    gender,
    dob,
    age: userAge,
    password: hashedPassword,
    avatar: getAvatar(),
  });
  try {
    const savedUser = await user.save();
    res.json({ message: "User Registered", id: savedUser._id });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong " });
  }
});

/*************************************************************************************/

/**
 * LOGIN USER
 *
 * Can be used to login existing users which return a jwt token
 *
 * ROUTE: PUBLIC
 * URL: /api/auth/login
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body.data;
  let isAdmin = false;
  if (email === "admin@survey.com") isAdmin = true;

  // Check if user exist //
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "Email doesn't exist" });

  // Check if password is valid //
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Password is not valid" });

  // JWT //
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({ message: "User logged in", isAdmin: isAdmin, token: token });
});

/*************************************************************************************/

module.exports = router;
