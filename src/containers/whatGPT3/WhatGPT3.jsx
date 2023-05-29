import React, { useState, useContext } from "react";
import Feature from "../../components/feature/Feature";
import "./WhatGPT3.css";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const WhatGPT3 = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={
          darkMode
            ? "gpt3__whatgpt3 section__margin"
            : "gpt3__whatgpt3-light section__margin"
        }
        id="wgpt3"
      >
        <div className="gpt3__whatgpt3-feature">
          <Feature
            title="What is Loqui?"
            text= "Our video model utilizes state-of-the-art techniques in video understanding, achieving impressive accuracy in predicting words from videos."
          />
        </div>
        <div className="gpt3__whatgpt3-heading">
          <h1 className="gradient__text">
            The possibilities are beyond your imagination
          </h1>
        </div>
        <div className="gpt3__whatgpt3-container">
          <Feature
            title="User-Friendly Video Predictions"
            text="With our user-friendly web UI, anyone can easily upload their videos and obtain instant predictions of the word being performed."
          />
          <Feature
            title="Real-Time Video Processing"
            text="Experience real-time predictions as our model quickly processes videos, making it ideal for applications like live streaming and real-time captioning."
          />
          <Feature 
            title=" Enhancing Content Understanding."
            text="By promoting accessibility, our model enhances content understanding for individuals with hearing impairments and non-native speakers, fostering inclusivity in video-based interactions."
          />
        </div>
      </div>
    </>
  );
};

export default WhatGPT3;
