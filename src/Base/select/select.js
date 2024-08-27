import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const SelectInput = forwardRef(({ labelPath, valuePath, dataSource, label, value, disabled, ...props }, ref) => {
  const [_value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (value != _value) {
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

  const changeHandler = (event) => {
    setValue(event.target.value);
    props.onChange && props.onChange(event.target?.value);
  };

  const onblurHandler = (event) => {
    props.onBlur && props.onBlur(event.target?.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select error={hasError} value={_value} label={label} {...props} onChange={(event) => changeHandler(event)} onBlur={(event) => onblurHandler(event)}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((item) => {
            return <MenuItem value={item[valuePath]}>{item[labelPath]}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
});

export default SelectInput;
