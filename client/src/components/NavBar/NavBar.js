import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo-name">
        <a href="# ">Survey Guru</a>
      </div>
      <ul className="navig-items">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="# ">Contact</a>
        </li>
        <li>
          <a href="# ">About</a>
        </li>
      </ul>
      <div className="user-btn">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
