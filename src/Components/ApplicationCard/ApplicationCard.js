import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { WrapperContainer } from "../../Base";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ApplicationCard = ({
  header,
  children,
  headerIcon,
  disabledExpendMoreIcon,
  actionList,
  disabled,
}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  return (
    <Accordion disabled={disabled} style={{ margin: "0 0 20px 0" }}>
      <AccordionSummary
        expandIcon={!disabledExpendMoreIcon && <ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <WrapperContainer inner>
          <div xs={0.5}>{headerIcon && headerIcon}</div>

          <Typography xs={11.5} style={{ fontSize: "1.5rem" }}>
            {header}
          </Typography>
        </WrapperContainer>
      </AccordionSummary>
      <AccordionDetails>
        <WrapperContainer>{children}</WrapperContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default ApplicationCard;
