import React from "react";
import { Container } from "react-bootstrap";
import frame1 from "./Frame1(desktop).png";
import frame2 from "./Frame2(desktop).png";
import frame3 from "./Frame3(desktop).png";
import frame4 from "./background.png";

import frame7 from "./background.png";
import "./backimg.css";

const BackImg = (props) => {
  return (
    <>
      <img src={frame1} alt="frame1" className="frame1" />
      <img src={frame2} alt="frame2" className="frame2" />
      <img src={frame3} alt="frame3" className="frame3" />
      <img src={frame4} alt="frame4" className="frame4" />
      <img src={frame7} alt="frame7" className="frame7" />
    </>
  );
};

export default BackImg;
