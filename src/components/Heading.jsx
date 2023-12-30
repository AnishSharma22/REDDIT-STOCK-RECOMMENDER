import React from "react";
import logo from "../assets/rdd.svg";
import "../App.css";

const Heading = () => {
  return (
    <>
      <div className="heading flex justify-between items-center my-10 ">
        <div><h1>Reddit Based Stock Predictor</h1></div>
        <div>
          <img className="svg-button" src={logo} alt="SVG Button" />
        </div>
      </div>
    </>
  );
};

export default Heading;
