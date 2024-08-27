import {} from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { isNullOrUndefinedOrEmpty } from "../../Helper/helper";
import Input from "../input/input";

export const DatePicker = forwardRef(
  ({ disabled, value, onBlur, InputLabelProps, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [_value, setValue] = useState(value);
    const inputRef = useRef();

    useEffect(() => {
      if (value != null && value.includes("T")) {
        let index = value.indexOf("T");
        const _value = value.slice(0, index);
        const partialDate = _value.split("-");
        let date = "";
        partialDate.forEach((element) => {
          date += element + "-";
        });
        date = date.slice(0, -1);
        setValue(date);
      } else {
        setValue(value);
      }
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
      props?.onChange && props.onChange(event, event?.target?.value);
    };

    const inputOnBlur = (value) => {
      onBlur && onBlur(value);
    };

    return (
      <Input
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
          shrink: true,
          ...InputLabelProps,
        }}
        type="date"
      />
    );
  }
);

export default DatePicker;
