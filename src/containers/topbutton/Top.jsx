import React from "react";
import "./Top.css";

const Top = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      document.getElementById("mybtn").style.bottom = "60px";
    } else {
      document.getElementById("mybtn").style.bottom = "-60px";
    }
  }

  return (
    <>
      <div>
        <a href="#navtop" id="mybtn" className="topbtn">
          <i className="fas fa-hand-point-up" aria-hidden="true"></i>
        </a>
      </div>
    </>
  );
};

export default Top;
