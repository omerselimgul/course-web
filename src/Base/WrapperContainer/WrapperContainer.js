import React, { useLayoutEffect, useRef, useState } from "react";
import "./WrapperContainer.css";
import { Grid } from "@mui/material";

const WrapperContainer = ({ children, padding, sx, margin, ...props }) => {
  const [style, setStyle] = useState({
    width: "100%",
    overflow: "hidden",
    justifyContent: props?.justifyContent || "",
    alignItems: props?.alignItems || "center",
    ...props?.style,
  });

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (
      !child ||
      typeof child === "string" ||
      (child.type && child.type.displayName === "WrapperContainer")
    ) {
      return child;
    }
    if (React.isValidElement(child)) {
      let { xs, ...childprops } = child?.props;
      return (
        <Grid
          key={index}
          item
          xs={xs || 2}
          style={{
            padding: padding ? padding : "5px",
            margin: margin ? margin : "0px",
          }}
        >
          {React.cloneElement(child, { ...childprops, fullWidth: true })}
        </Grid>
      );
    }
  });
  return (
    <Grid
      style={style}
      {...props}
      // rowGap={props?.rowGap || 2}
      container
      sx={{
        // backgroundColor: "red"
        padding: props?.inner ? "0px 0px" : "1rem 0.5rem",
        ...sx,
      }}
      className={props?.className}
      // spacing={props?.spacing || 2}
      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={props?.columns || 12}
      // margin="1rem 0rem"
      columnGap={props?.gap || 0}
    >
      {childrenWithProps}
    </Grid>
  );
};
WrapperContainer.displayName = "WrapperContainer";
export default WrapperContainer;
