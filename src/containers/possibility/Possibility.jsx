import React from "react";
import "./Possibility.css";
import possibilityImage from "../../assets/possibility.png";
import { UploadPage } from "../../components";

const Possibility = () => {
  return (
    <>
      <div className="gpt3__possibility section__padding" id="possibility">
        <div className="gpt3__possibility-image">
          <img src={possibilityImage} alt="possibility" />
        </div>
        <div className="gpt3__possibility-content">
          <h4>Request Early Access to Get Started</h4>
          <h1 className="gradient__text">
            The possibilities are <br /> beyond your imagination
          </h1>
          <p className="pos--text">
          Unlocking the secrets of unspoken words, lip reading unveils a hidden language of the lips
          In the silent symphony of communication, lips become the conductor, guiding understanding through the art of lip reading
          With attentive eyes and deciphering minds, lip reading breathes life into silent conversations, bridging the gap between sound and expression.
          </p>

        </div>
       
      </div>
    <div className="d">
    <UploadPage/>
    </div>
    </>
  );
};

export default Possibility;
