import { CardMedia } from "@mui/material";
import React from "react";

const Img = ({ backgroundImage, height, width, ...props }) => {
  return (
    <CardMedia
      src={props?.src}
      component="img"
      image={backgroundImage}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: height || "20px",
        width: width || "20px",
      }}
    />
  );
};

export default Img;
