import React, { useEffect, useState } from "react";
import { Button, WrapperContainer } from "../../Base";
import { Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import "./CourseDetailCard.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Mobil from "./mobil.jpg";
import { useNavigate } from "react-router-dom";

const typoStyle = {
  color: "grey",
  fontSize: "0.95rem",
  textAlign: "left",
  padding: "1rem .5rem",
};
const CourseDetialCard = ({
  id,
  title,
  image,
  time,
  category,
  animationTime,
  quota,
  source,
  ...props
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    let defaultTime = 2000;
    if (animationTime) defaultTime = animationTime;

    AOS.init(defaultTime);
  }, []);

  const applyCourse = () => {
    navigate(`/application-page/${id}`);
  };
  return (
    <div
      className="course-card-container"
      data-aos="zoom-in"
      style={{ height: "600px" }}
    >
      <div className="course-card" style={{ height: "600px" }}>
        <div className={"course-header"} style={{ height: "200px" }}>
          <img
            className={"course-image"}
            alt=""
            src={Mobil}
            width="100%"
            height="100%"
          />
        </div>
        <div className="course-content" style={{ height: "400px" }}>
          <Typography>{category}</Typography>
          <br />
          {source &&
            Object.keys(source)?.map((field) => {
              return (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography style={typoStyle} variant="subtitle3">
                      {field?.replaceAll("_", " ")}
                    </Typography>
                    <Typography style={typoStyle} variant="subtitle3">
                      {source[field]}
                    </Typography>
                  </div>
                  <hr />
                </div>
              );
            })}
          <Button
            label={"Başvur !!"}
            onClick={() => applyCourse()}
            auth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetialCard;
