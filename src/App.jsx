import React from "react";
import Heading from "./components/Heading";
import Slider from "./components/Slider";
import Data from "./components/Data";
import "./App.css";
import { RecoilRoot } from "recoil";
import Line from "./components/Line";
import Footer from "./components/Footer";

const App = () => {
  return (
    <RecoilRoot>
      <div>
        <Heading />
        <Slider />
        <br />
        <br />
        <Line />
        <Data />
        <Footer />
      </div>
    </RecoilRoot>
  );
};

export default App;
