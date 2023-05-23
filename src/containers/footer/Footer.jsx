import React, { useContext } from "react";
import gpt3Logo from "../../assets/logo.svg";
import "./Footer.css";
import TopButton from "../topbutton/Top";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
    <div className="border"> .</div>
      <div
        className={
          darkMode
            ? "gpt3__footer section__padding"
            : "gpt3__footer-light section__padding"
        }
      >
       

        <div className="gpt3__footer-links">
          <div
            className={
              darkMode
                ? "gpt3__footer-links_logo"
                : "gpt3__footer-links_logo-light"
            }
          >
          </div>
        </div>

        <div
          className={
            darkMode ? "gpt3__footer-copyright" : "gpt3__footer-copyright-light"
          }
        >
          <p>@2023 Loqui. All rights reserved [Thebestfordeep@gmail.com.]</p>
          <div className="Upperbtn">
            <TopButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
