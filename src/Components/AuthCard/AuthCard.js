import React from "react";

const AuthCard = (props) => {
  return (
    <div
      style={{
        width: props?.side ? "50%" : props?.width || "70%",
        height: props?.side ? "100%" : props?.height || "80%",
        display: props?.flex && "flex",
        ...props?.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default AuthCard;
