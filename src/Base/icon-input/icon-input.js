import { AccountCircle } from "@mui/icons-material";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const IconInput = forwardRef(
  (
    { label, start, icon, placeholder, onBlur, value, disabled, ...props },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);
    const [_value, setValue] = useState(value);

    useImperativeHandle(ref, () => ({
      validate: () => {
        if (props?.error) {
          return props?.error;
        }

        if (!disabled) {
          if (props.required) {
            if (!_value) {
              setHasError(true);
              return false;
            }
            setHasError(false);
            return true;
          } else {
            setHasError(false);
            return true;
          }
        }
        setHasError(false);
        return true;
      },
      value: _value,
    }));

    const startAdornment = () => {
      if (icon && icon?.length > 0) {
        const adornment = icon.find((x) => x?.Position === "start");
        if (adornment && adornment?.Icon) {
          return (
            <InputAdornment position="start">{adornment?.Icon}</InputAdornment>
          );
        }
      }
      return null;
    };
    const endAdornment = () => {
      if (icon && icon?.length > 0) {
        const adornment = icon.find((x) => x?.Position === "end");
        if (adornment && adornment?.Icon) {
          return (
            <InputAdornment position="end">{adornment?.Icon}</InputAdornment>
          );
        }
      }
      return null;
    };

    const inputOnChange = (event) => {
      setValue(event.target?.value);
      props?.onChange && props.onChange(event, event?.target?.value);
    };

    const inputOnBlur = (event) => {
      onBlur && onBlur(event?.target?.value, event);
    };
    return (
      <FormControl variant="standard" style={{ width: "100%" }}>
        <InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder={placeholder}
          startAdornment={startAdornment()}
          endAdornment={endAdornment()}
          {...props}
          error={props?.error || hasError}
          value={_value}
          onChange={(event) => {
            inputOnChange(event);
          }}
          onBlur={(event) => inputOnBlur(event)}
        />
        {props?.helperText && (
          <p style={{ color: "red", fontSize: "15px" }}>{props?.helperText}</p>
        )}
      </FormControl>
    );
  }
);

export default IconInput;
