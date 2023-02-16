import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../images/CropLogo.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" activeClassName="active" className="nav-logo">
            {/* <img src={logo} alt="I-Krishi" /> */}
            I-Krishi
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to=""
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                className="nav-links"
                activeClassName="active"
                onClick={handleClick}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/weather"
                className="nav-links"
                activeClassName="active"
                onClick={handleClick}
              >
                WeatherInfo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/market"
                className="nav-links"
                activeClassName="active"
                onClick={handleClick}
              >
                MarketInfo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/crop"
                className="nav-links"
                activeClassName="active"
                onClick={handleClick}
              >
                CropInfo
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <RxHamburgerMenu
              className={click ? "fas fa-times" : "fas fa-bars"}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
