import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const BaseTab = ({ tabItems, ...props }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="black"
          indicatorColor="secondary"
        >
          {tabItems &&
            tabItems?.map((item, index) => {
              return (
                <Tab
                  label={item?.header}
                  style={{ fontSize: "1rem" }}
                  {...a11yProps(index)}
                />
              );
            })}
        </Tabs>
      </Box>
      {tabItems &&
        tabItems?.map((item, index) => {
          return (
            <CustomTabPanel value={value} index={index}>
              {item?.content}
            </CustomTabPanel>
          );
        })}
    </Box>
  );
};

export default BaseTab;
