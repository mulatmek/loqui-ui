import React, { useState, useContext } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import "./Navbar.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "dark" : "light"} id="navtop">
      <div className="gpt3__navbar">
        <div className="gpt3__navbar-links">
          <div className="gpt3__navbar-links_logo">
            <h3
              style={{
                fontSize: "23px",
                fontWeight: "900",
                fontFamily: "Manrope",
                color: "gba(95, 78, 78, 0.979)",
              }}
              className={darkMode ? "dark" : "lightMode"}
            >
              &nbsp;&nbsp;
              {darkMode ? <img src={logo} alt="logo" /> : "Loqui"}
            </h3>
          </div>
          <div
            className={
              darkMode
                ? "dark gpt3__navbar-links_container"
                : "lightMode gpt3__navbar-links_container"
            }
          >
            <p>
              <a href="#home">Home</a>
            </p>
            <p>
              <a href="#wgpt3">What is Loqui?</a>
            </p>
            <p>
              <a href="#upload">Upload Video</a>
            </p>
          </div>
        </div>
        <div className="gpt3__navbar-sign">
          <ToggleSwitch />
        </div>
        <div
          className={
            darkMode ? "dark gpt3__navbar-menu" : "lightMode gpt3__navbar-menu"
          }
        >
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <a className={!darkMode ? "darkText" : null} href="#home">
                    Home
                  </a>
                </p>
                <p>
                 
                </p>
                <p>
                  <a
                    className={!darkMode ? "darkText" : null}
                    href="#possibility"
                  >
                    Open AI
                  </a>
                </p>
                <p>
                  <a className={!darkMode ? "darkText" : null} href="#features">
                    Case Studies
                  </a>
                </p>
                <p>
                  <a className={!darkMode ? "darkText" : null} href="#blog">
                    Library
                  </a>
                </p>
              </div>
              <div className="gpt3__navbar-menu_container-links-sign">
                <ToggleSwitch />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
