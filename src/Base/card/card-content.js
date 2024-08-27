import MuiCardContent from "@mui/material/CardContent";
import MuiGrid from "@mui/material/Grid";
import React from "react";
import { resizeBreakpoint } from "../util/util";

const CardContent = ({
  children,
  disabled: cardDisabled,
  readOnly: cardReadOnly,
  columns,
  itemSx,
  styles,
  ...rest
}) => {
  const style = {
    ...styles,
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!child || typeof child === "string") {
      return child;
    }
    if (React.isValidElement(child)) {
      let { xs, md, lg, disabled, ...childProps } = child.props;

      const childRenderSize = resizeBreakpoint({ xs, md, lg });
      return (
        <MuiGrid
          key={index}
          sx={{ padding: "8px", ...itemSx }}
          item
          {...childRenderSize}
        >
          {React.cloneElement(child, {
            ...childProps,
            fullWidth: true,
            disabled: cardDisabled || disabled,
            // readOnly: cardReadOnly || readOnly,
          })}
        </MuiGrid>
      );
    }
    return (
      <MuiGrid key={index} item xs={12}>
        {child}
      </MuiGrid>
    );
  });
  return (
    <MuiCardContent>
      <MuiGrid sx={{ ...style }} container columns={columns}>
        {childrenWithProps}
      </MuiGrid>
    </MuiCardContent>
  );
};

export default CardContent;
