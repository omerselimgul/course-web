import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { convertDateTimeToDateTime } from "../../Helper/helper";
import "./Announce.css";

const Announce = ({ announcements, animationTime }) => {
  const [open, setOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    let defaultTime = 200;
    if (animationTime) defaultTime = animationTime;

    AOS.init({ duration: defaultTime });
  }, [animationTime]);

  const handleClickOpen = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="announce-container" data-aos="zoom-in">
      <div className="announce-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            borderBottom: "1px solid #333",
            paddingBottom: "8px",
          }}
        >
          <NotificationsNoneOutlinedIcon />
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              color: "#333",
              marginLeft: "10px",
            }}
          >
            Duyurular
          </Typography>
        </div>
        {announcements.map((announcement, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CampaignOutlinedIcon style={{ marginRight: "10px" }} />
              <Typography variant="h6" className="announce-title" style={{ cursor: "pointer" }} onClick={() => handleClickOpen(announcement)}>
                {announcement.header}
              </Typography>
            </div>
            <Typography variant="body1" className="announce-time">
              {convertDateTimeToDateTime(announcement.announcementDate)}
            </Typography>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle
            style={{
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              paddingRight: "24px",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {selectedAnnouncement.header}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                color: "#555",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            style={{
              padding: "24px",
              backgroundColor: "#fafafa",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            <Typography
              variant="body1"
              style={{
                marginBottom: "16px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                lineHeight: "1.6",
              }}
            >
              {selectedAnnouncement.description}
            </Typography>
            <Typography variant="body2" style={{ color: "#888" }}>
              {convertDateTimeToDateTime(selectedAnnouncement.announcementDate)}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Announce;
