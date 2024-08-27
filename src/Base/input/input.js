import { TextField } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isNullOrUndefinedOrEmpty } from "../../Helper/helper";

export const Input = forwardRef(
  ({ disabled, value, onBlur, InputLabelProps, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [_value, setValue] = useState(value);
    const inputRef = useRef();

    useEffect(() => {
      setValue(value);
    }, [value]);

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

    const inputOnChange = (event) => {
      setValue(event.target?.value);
      props?.onChange && props.onChange(event);
    };

    const inputOnBlur = (event) => {
      onBlur && onBlur(event?.target?.value, event);
    };

    return (
      <TextField
        ref={inputRef}
        {...props}
        fullWidth
        error={props?.error || hasError}
        value={_value}
        onChange={(event) => {
          inputOnChange(event);
        }}
        onBlur={(event) => inputOnBlur(event)}
        InputLabelProps={{
          shrink:
            props?.type === "date" || !isNullOrUndefinedOrEmpty(_value)
              ? true
              : InputLabelProps?.shrink,
          ...InputLabelProps,
        }}
      />
    );
  }
);

// Input.propTypes = {
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "error",
//     "info",
//     "success",
//     "warning",
//   ]),
//   disabled: PropTypes.bool,
//   error: PropTypes.bool,
//   helperText: PropTypes.string,
//   inputMode: PropTypes.oneOf(["default", "mask", "number"]),
//   label: PropTypes.string,
//   onChange: PropTypes.func,
//   required: PropTypes.bool,
//   size: PropTypes.oneOf(["small", "medium"]),
//   value: PropTypes.string,
//   variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
// };

// Input.defaultProps = {
//   inputMode: "default",
//   digitCount: 10,
//   size: "small",
// };
export default Input;
