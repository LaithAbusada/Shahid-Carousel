import React, { useState, useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData.email);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  return (
    <nav>
      <Link to="/" className="title">
        <h1>
          {" "}
          Welcome <span>{user ? user : "to Shahid"}</span>{" "}
        </h1>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
