import React, { useContext } from "react";
import "./Feature.css";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const Feature = ({ title, text }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div className="gpt3__features-container__feature">
        <div className="gpt3__features-container__feature-title">
          <div />
          <h1 className={!darkMode ? "darkText" : null}>{title}</h1>
        </div>
        <div className="gpt3__features-container_feature-text">
          <p className="feature--text">{text}</p>
        </div>
      </div>
    </>
  );
};

export default Feature;
