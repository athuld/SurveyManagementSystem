const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./api/auth");
const userRoute = require("./api/user");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
// Import the configs
dotenv.config();

app.listen(5001, console.log("Server Started"));

// Connect to database
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Database Connected");
  }
);

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
