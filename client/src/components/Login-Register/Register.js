import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./common.scss";
import authPng from "./auth.png";
import {
  TextField,
  Grid,
  StylesProvider,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Register = ({ setShowAlertModal, setIsRegistered }) => {
  document.title = "Register";

  // State Hooks
  const [register, setRegister] = useState({});
  const [validatePwd, setValidatePwd] = useState({ error: false, message: "" });

  const validate = () => {
    if (register.password !== register.confirm_password) {
      setValidatePwd({ error: true, message: "Passwords doesn't match" });
      return false;
    }
    return true;
  };
  // Register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate() === true) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/auth/register`,
          { data: register }
        );
        console.log(response.data.message);
        if (response.data.id) {
          setShowAlertModal(true);
          setIsRegistered(true);
        }
      } catch (error) {
        console.log(error);
        setShowAlertModal(true);
        setIsRegistered(false);
      }
    }
  };

  // Update the State Hook
  const handleChange = (e) => {
    setRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(register);
  };

  const districtValues = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  // Render
  return (
    <main>
      <NavBar />
      <div className="main-container">
        <img
          src={authPng}
          alt="Authentication Illustration"
          className="auth-image"
        />
        <motion.div
          transition={transition}
          exit={{ opacity: 0 }}
          className="form-container"
        >
          <form
            action=""
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="form"
          >
            <StylesProvider injectFirst>
              <h2>Register</h2>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    variant="filled"
                    margin="dense"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    variant="filled"
                    margin="dense"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="filled"
                    margin="dense"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="filled"
                    fullWidth
                    margin="dense"
                    required
                  >
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="select-gender"
                      id="gender"
                      name="gender"
                      label="Gender"
                      defaultValue=""
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Date Of Birth"
                    margin="normal"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                    name="dob"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    margin="dense"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    error={validatePwd.error}
                    helperText={validatePwd.message}
                    margin="dense"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    variant="filled"
                    fullWidth
                    margin="dense"
                    required
                  >
                    <InputLabel id="district">District</InputLabel>
                    <Select
                      labelId="select-district"
                      id="district"
                      name="district"
                      label="District"
                      defaultValue=""
                      onChange={handleChange}
                    >
                      {districtValues.map((district, i) => {
                        return (
                          <MenuItem value={district} key={i}>
                            {district}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <button type="submit" className="register-btn">
                Register
              </button>
              <br />
              <div className="info">
                <span>
                  Already have an account? <Link to="/login">Log In</Link>
                </span>
              </div>
            </StylesProvider>
          </form>
        </motion.div>
      </div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
    </main>
  );
};

export default Register;
