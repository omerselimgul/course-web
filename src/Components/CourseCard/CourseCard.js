import React, { useEffect } from "react";
import { Button } from "../../Base";
import { Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import "./CourseCard.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseCard = ({ id, title, image, time, category, animationTime, closePersonIcon, quota, buttonName, closeTimeIcon, ...props }) => {
  useEffect(() => {
    let defaultTime = 2000;
    if (animationTime) defaultTime = animationTime;

    AOS.init(defaultTime);
  }, []);

  return (
    <div className="course-card-container" data-aos="zoom-in">
      <div className="course-card">
        <div className={"course-header"}>
          <img className={"course-image"} alt="" src={image} width="100%" height="100%" />
        </div>
        <div className="course-content">
          <Typography
            style={{
              color: "grey",
              fontSize: "0.95rem",
              textAlign: "left",
              width: "99%",
            }}
          >
            {category}
          </Typography>
          <Typography variant="subtitle2">{title}</Typography>
          <Stack direction="row" spacing={1} alignItems="end" style={{ marginTop: "18px", width: "94%" }}>
            {!closePersonIcon && (
              <>
                <PersonOutlineOutlinedIcon style={{ color: "grey", fontSize: "1.4rem" }} />
                <Typography variant="body2" style={{ color: "grey", fontSize: "0.9rem" }}>
                  {quota}
                </Typography>
              </>
            )}

            {!closeTimeIcon && (
              <>
                <AccessTimeOutlinedIcon style={{ color: "grey", fontSize: "1.4rem" }} />
                <Typography variant="body2" style={{ color: "grey", fontSize: "0.9rem" }}>
                  {time}
                </Typography>
              </>
            )}
          </Stack>
        </div>
        <Button
          label={buttonName || "Kurs Detayı "}
          variant={"contained"}
          className={"course-button"}
          style={{ backgroundColor: " #E7643E", marginTop: "0.5rem" }}
          onClick={() => props?.onClick && props.onClick(id)}
        />
      </div>
    </div>
  );
};

export default CourseCard;
