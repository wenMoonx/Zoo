import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./button.css";

const CButton = (props) => {
  return (
    <>
      <Nav.Link
        className="custom-button"
        style={{
          width: props.width,
          height: props.height,
          fontSize: props.fontSize,
          marginBottom: props.pb * 10 + "px",
          marginRight: props.mr,
            lineHeight: props.lineHeight ? props.lineHeight : 1
        }}
        onClick={props.onClick}
        key={props.key}
        disabled={props.disabled}
      >
        {props.value}
      </Nav.Link>
    </>
  );
};

export default CButton;
