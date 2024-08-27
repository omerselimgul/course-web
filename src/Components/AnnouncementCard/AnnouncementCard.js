import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { convertDateTimeToDateTime } from "../../Helper/helper";
import "./AnnouncementCard.css";

const AnnouncementCard = ({ id, header, description, announcementDate, animationTime, ...props }) => {
  useEffect(() => {
    let defaultTime = 2000;
    if (animationTime) defaultTime = animationTime;

    AOS.init(defaultTime);
  }, []);

  return (
    <div className="announcement-card-container" data-aos="zoom-in">
      <div className="announcement-card">
        <div className={"announcement-header"}>
          <CampaignOutlinedIcon style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="announcement-content">
          <dib variant="subtitle2">{convertDateTimeToDateTime(announcementDate)}</dib>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {header}
          </div>
          <dib variant="subtitle2">{description}</dib>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
