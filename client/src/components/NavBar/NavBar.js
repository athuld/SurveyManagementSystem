import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = ({ user }) => {
  if (!user) {
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
  }
  return (
    <nav className="navbar">
      <div className="logo-name">
        <a href="# ">Survey Guru</a>
      </div>
      <ul className="navig-items">
        <li>
          <Link to="/user">Home</Link>
        </li>
        <li>
          <a href="# ">Surveys</a>
        </li>
        <li>
          <a href="# ">Complaints</a>
        </li>
      </ul>
      <div className="user-btn">
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default NavBar;
