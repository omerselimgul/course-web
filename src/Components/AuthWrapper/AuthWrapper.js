import React from "react";
import "./wrapper.css";

const AuthWrapper = ({ heigth, bgColor, ...props }) => {
  return (
    <div
      className="Container"
      style={{ height: heigth, backgroundColor: bgColor, ...props?.style }}
    >
      {props.children}
    </div>
  );
};
export default AuthWrapper;
