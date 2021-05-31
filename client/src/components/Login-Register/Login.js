import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./common.scss";
import authPng from "./auth.png";
import Cookie from "js-cookie";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Login = ({ setShowAlertModal, setIsLoggedIn }) => {
  document.title = "Login";
  const history = useHistory();
  // State Hooks
  const [login, setLogin] = useState({});

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { data: login }
      );
      if (response.data.token) {
        Cookie.set("accessToken", response.data.token);
        history.push("/user");
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setShowAlertModal(true);
    }
  };

  // Set State Hooks
  const handleChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Render
  return (
    <main transition={transition} exit={{ opacity: 0 }}>
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
            <h2>Login</h2>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" required />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" required />
            <br />
            <button type="submit" className="register-btn login">
              Log In
            </button>
            <br />
            <span className="info">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </span>
          </form>
        </motion.div>
      </div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
    </main>
  );
};

export default Login;
