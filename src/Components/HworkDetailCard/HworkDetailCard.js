import React, { useEffect } from "react";
import { Button } from "../../Base";
import { Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import "./HworkDetailCard.css";
import AOS from "aos";
import "aos/dist/aos.css";
import AppCard from "../../Components/AppCard/AppCard";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { convertDateTimeToDate, createDateFromDateTime, isNullOrUndefinedOrEmpty, truncate } from "../../Helper/helper";

const HworkDetailCard = ({
  id,
  title,
  image,
  starttime,
  description,
  finishtime,
  category,
  animationTime,
  quota,
  data,
  assigmentHref,
  homeWorkFile,
  isOutOfDate,
  ...props
}) => {
  useEffect(() => {
    let defaultTime = 2000;
    if (animationTime) defaultTime = animationTime;

    AOS.init(defaultTime);
  }, []);

  return (
    <div className="course-card-container" data-aos="zoom-in">
      <div className="course-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 20px",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="subtitle2" style={{ fontSize: "1.4rem", textAlign: "left" }}>
            {title}
          </Typography>
          <Typography
            style={{
              color: "grey",
              fontSize: "0.9rem",
              textAlign: "right",
            }}
          >
            {data?.studentHomeWorkStatus}
          </Typography>
        </div>
        <Typography
          variant="body2"
          style={{
            fontSize: "0.95rem",
            wordWrap: "break-word",
            margin: "10px 20px",
          }}
        >
          {truncate(description, 25)}
        </Typography>
        <AppCard
          primary="Ödev Dosyası "
          secondary={
            <a href={assigmentHref} target="_blank" rel="noreferrer">
              <FindInPageIcon />
            </a>
          }
        />
        <AppCard
          primary="Yüklediğiniz Dosyası: "
          secondary={
            !isNullOrUndefinedOrEmpty(homeWorkFile) ? (
              <a href={homeWorkFile} target="_blank" rel="noreferrer">
                <FindInPageIcon />
              </a>
            ) : (
              "Henüz ödev yüklenmedi"
            )
          }
        />
        <Stack
          direction="row"
          spacing={1}
          alignItems="end"
          style={{
            margin: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccessTimeOutlinedIcon style={{ color: "grey", fontSize: "1.4rem" }} />
          <Typography variant="body2" style={{ fontSize: "0.95rem" }}>
            {convertDateTimeToDate(starttime)}
          </Typography>
          <Typography variant="bod)y2" style={{ fontSize: "0.95rem" }}>
            {convertDateTimeToDate(finishtime)}
          </Typography>
          <Typography variant="bod)y2" style={{ fontSize: "0.95rem" }}>
            {!isNullOrUndefinedOrEmpty(data?.score) ? `Puan : ${data?.score?.toFixed(2)}` : `Puan : -`}
          </Typography>
        </Stack>
        <Button
          label={"Ödevi Yükle"}
          variant={"contained"}
          className={"course-button"}
          style={{
            ...(data?.workStatus && {
              backgroundColor: " #E7643E",
              marginTop: "0.1rem",
            }),
          }}
          onClick={() => props?.onClick && props.onClick(id)}
          disabled={!data?.workStatus}
        />
      </div>
    </div>
  );
};

export default HworkDetailCard;
