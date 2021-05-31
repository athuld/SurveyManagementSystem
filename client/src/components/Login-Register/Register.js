import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./common.scss";
import authPng from "./auth.png";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Register = ({ setShowAlertModal, setIsRegistered }) => {
  document.title = "Register";

  // State Hooks
  const [register, setRegister] = useState({});

  // Register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
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
  };

  // Update the State Hook
  const handleChange = (e) => {
    setRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          <form action="" onSubmit={handleSubmit} onChange={handleChange}>
            <h2>Register</h2>
            <br />
            <label htmlFor="firstname">First Name</label>
            <br />
            <input type="text" name="firstname" id="firstname" required />
            <br />
            <label htmlFor="lastname">Last Name</label>
            <br />
            <input type="text" name="lastname" id="lastname" required />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" required />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength="5"
            />
            <br />
            <button type="submit" className="register-btn">
              Register
            </button>
            <br />
            <span className="info">
              Already have an account? <Link to="/login">Log In</Link>
            </span>
          </form>
        </motion.div>
      </div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
    </main>
  );
};

export default Register;
