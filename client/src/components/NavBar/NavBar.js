import { Link, useHistory } from "react-router-dom";
import "./NavBar.scss";
import Cookie from "js-cookie";

const NavBar = ({ user }) => {
  const history = useHistory();

  const handleLogout = () => {
    Cookie.remove("accessToken");
    history.push("/");
  };

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
        <button className="user-btn">
          <Link to="/login">Login</Link>
        </button>
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
      <button className="user-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
