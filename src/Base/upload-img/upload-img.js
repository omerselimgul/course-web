import { Avatar } from "@mui/material";
import React, { useId, useState } from "react";
import { BoxWrapper } from "../../Base";

const UploadImage = ({ value, onChange, width, height, disableAction, ...props }) => {
  const [id, setId] = useState(useId());
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[event.target.files.length - 1];

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      onChange(imageUrl);
    }
  };

  return (
    <BoxWrapper style={{ display: "flex", justifyContent: "center" }}>
      <Avatar
        src={value}
        sx={{
          cursor: disableAction ? "" : "pointer",
          width: width || "150px",
          height: height || "150px",
        }}
        onClick={() => {
          if (!disableAction) document.getElementById(id).click();
        }}
      />
      {!disableAction && <input id={id} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />}
    </BoxWrapper>
  );
};

export default UploadImage;
