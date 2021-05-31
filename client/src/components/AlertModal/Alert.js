import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Alert.scss";
import verified from "./verified.png";
import notVerified from "./error.png";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-2vh",
    opacity: 0,
  },
  visible: {
    y: "100px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const AlertModal = ({
  showAlertModal,
  setshowAlertModal,
  isLoggedIn,
  isRegistered,
}) => {
  let showRegError = false;
  let showRegSuccess = false;
  let showLoginError = false;

  if (isLoggedIn !== null) {
    showLoginError = true;
  } else if (isRegistered !== false) {
    showRegSuccess = true;
  } else showRegError = true;

  return (
    <AnimatePresence exitBeforeEnter>
      {showAlertModal && (
        <motion.div
          className="alert-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {showLoginError && (
            <motion.div className="alert-errorModal" variants={modal}>
              <img src={notVerified} alt="Not Verified" className="image" />
              <h2>Oops Something Is Wrong !</h2>
              <h4>Check your credentials and try again</h4>
              <Link to="/login">
                <button
                  onClick={() => {
                    setshowAlertModal(false);
                  }}
                >
                  Try Again
                </button>
              </Link>
            </motion.div>
          )}

          {showRegError && (
            <motion.div className="alert-errorModal" variants={modal}>
              <img src={notVerified} alt="Not Verified" className="image" />
              <h2>Error In registration !</h2>
              <h4>Looks like you're using an existing credentials</h4>
              <Link to="/signup">
                <button
                  onClick={() => {
                    setshowAlertModal(false);
                  }}
                >
                  Try Again
                </button>
              </Link>
            </motion.div>
          )}

          {showRegSuccess && (
            <motion.div className="alert-successModal" variants={modal}>
              <img src={verified} alt="Verified" className="image" />
              <h2>Successfully Registered !</h2>
              <h3>Login to continue</h3>
              <Link to="/login">
                <button
                  onClick={() => {
                    setshowAlertModal(false);
                  }}
                >
                  Log In
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
