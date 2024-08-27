import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FireBaseStorage } from "../../Firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { isNullOrUndefinedOrEmpty } from "../../Helper/helper";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const FileUpload = forwardRef(({ disabled, value, name, Id, label, isVisiable, ...props }, componentRef) => {
  const [hasError, setHasError] = useState(false);
  const [_value, setValue] = useState(value);
  const inputRef = useRef();
  useImperativeHandle(componentRef, () => ({
    validate: () => {
      if (!isNullOrUndefinedOrEmpty(value)) {
        setHasError(false);
        return true;
      }
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
    save: async () => {
      const response = await SaveFile(_value);
      return response;
    },
    focus: () => {
      inputRef.current?.click();
    },
  }));

  const handleFileChange = (e) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setValue(file);
      return;
    }
    setValue(null);
  };

  const SaveFile = async (file) => {
    if (!isNullOrUndefinedOrEmpty(value) && isNullOrUndefinedOrEmpty(_value)) return value;
    if (isNullOrUndefinedOrEmpty(_value)) {
      return null;
    }
    const uuid = v4();
    let fileRef;
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();

    fileRef = ref(FireBaseStorage, `files/${uuid}.${fileExtension}`);

    const result = await uploadBytes(fileRef, _value);

    if (result) {
      const url = await getDownloadURL(result.ref);
      return url;
    }

    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        visibility: isVisiable !== false ? "" : "hidden",
      }}
    >
      <label htmlFor={Id} style={{ color: hasError && "#D32F2F" }}>
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        id={Id}
        onChange={(e) => handleFileChange(e, "highSchool")}
        required
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/pdf"
        name={name}
        style={{ color: hasError && "#D32F2F" }}
      />
      {value && (
        <a href={value} target="_blank" rel="noreferrer">
          <FindInPageIcon />
        </a>
      )}
    </div>
  );
});
export default FileUpload;
