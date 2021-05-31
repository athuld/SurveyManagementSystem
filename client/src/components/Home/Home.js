import "./Home.scss";
import { motion } from "framer-motion";
import NavBar from "../NavBar/NavBar";
import illustration from "./home.png";
import { Link } from "react-router-dom";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Home = () => {
  document.title = "Home";
  return (
    <motion.div transition={transition} exit={{ opacity: 0 }}>
      <NavBar />
      <main className="main-section">
        <div className="info-section">
          <ul className="info-items">
            <p>Govt. Surveys & Services at your fingertips</p>
            <li> Paticipate in online surveys and get rewarded</li>
            <li> Easy to access govt services at the comfort your homes</li>
          </ul>
          <div className="start-btn">
            <Link to="/login">Get Started</Link>
          </div>
        </div>
        <div>
          <img src={illustration} alt="Home Illustration" className="image" />
        </div>
      </main>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
    </motion.div>
  );
};

export default Home;
