import React, { useContext } from "react";
import "./Header.css";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const Header = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={darkMode ? "dark" : "light"}>
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">
              Experience the Magic of Lip Reading
            </h1>
            <p style={{"text-align":"left"}}>
            Introducing Loqui, the mesmerizing AI lips reading model that unravels the secrets behind silent conversations.

Unlock a new dimension of communication with Loqui, the groundbreaking AI model that deciphers spoken words from subtle lip movements.            </p>

            <div className="gpt3__header-content__input">
              <input type="email" placeholder="Your Email Address" />
              <button type="button">Get Started</button>
            </div>

            <div className="gpt3__header-content__people">
              <img src={people} alt="people img" />

              <p className={!darkMode ? "lightMode" : null}>
                1,600 people requested access a visit in last 24 hours
              </p>
            </div>
          </div>

          <div className="gpt3__header-image">
            <img src={ai} alt="ai img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
