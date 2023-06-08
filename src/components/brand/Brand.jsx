// Brand.js
import React from "react";
import "./Brand.css";
import { google, pytorch, openCV, jupyter, openAI } from "./Imports";

const Brand = () => {
  return (
    <>
      <div className="gpt3__brand section__padding">
        <div>
          <img className="brand__image" src={google} alt="google" />
        </div>
        <div>
          <img className="brand__image" src={pytorch} alt="pytorch" />
        </div>
        <div>
          <img className="brand__image" src={openCV} alt="openCV" />
        </div>
        <div>
          <img className="brand__image" src={jupyter} alt="jupyter" />
        </div>
        <div>
          <img className="brand__image" src={openAI} alt="openAI" />
        </div>
      </div>
    </>
  );
};

export default Brand;
