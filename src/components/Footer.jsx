import React from "react";
import githubImage from "../assets/github.svg";

const Footer = () => {
  return (
    <>
      <a
        href="https://github.com/AnishSharma22/REDDIT-STOCK-RECOMMENDER"
        target="_blank"
      >
        <div className="flex justify-center items-center my-6 hover:underline">
          <span>View on Github</span>
          <img src={githubImage} alt="github" className="w-6 ml-3" />
        </div>
      </a>
    </>
  );
};

export default Footer;
