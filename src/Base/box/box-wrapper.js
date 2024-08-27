import React from "react";
import "./box.css";
import { Box } from "@mui/material";
const BoxWrapper = (props) => {
  return (
    <div
      className="box"
      {...props}
      style={{
        // gap: props?.gap,
        ...props?.style,
      }}
    >
      {props.children}
    </div>
  );
};
export default BoxWrapper;
