import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const AppCard = ({ icon, primary, secondary }) => {
  return (
    <ListItem disablePadding style={{ height: "50px" }}>
      <ListItemButton>
        {icon}
        <ListItemText
          primary={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "0.9" }}>
                <Typography style={{ fontSize: "15px" }}>{primary}</Typography>
              </div>
              <div style={{ flex: "1.1" }}>
                {" "}
                <Typography style={{ fontSize: "15px" }}>
                  {secondary}
                </Typography>
              </div>
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
export default AppCard;
