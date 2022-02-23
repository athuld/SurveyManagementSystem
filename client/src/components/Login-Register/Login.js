import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./common.scss";
import authPng from "./auth.png";
import Cookie from "js-cookie";
import { TextField } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

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
        `${process.env.REACT_APP_URL}/api/auth/login`,
        { data: login }
      );
      if (response.data.token) {
        Cookie.set("accessToken", response.data.token);
        if (response.data.isAdmin) {
          history.push("/admin");
        } else history.push("/user");
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
          className="form-container login-cont"
        >
          <form
            action=""
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="form"
            id="login-form"
          >
            <StylesProvider injectFirst>
              <h2>Login</h2>
              <br />
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="filled"
                className="login-email"
                fullWidth
                required
              />
              <br />
              <br />
              <TextField
                // id="outlined-basic"
                id="password"
                name="password"
                label="Password"
                className="login-password"
                type="password"
                variant="filled"
                fullWidth
                required
              />
              <br />
              <button type="submit" className="register-btn login">
                LogIn
              </button>
              <br />
              <div className="info">
                <span>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
