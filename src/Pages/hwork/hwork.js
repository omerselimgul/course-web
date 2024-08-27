import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import React, { useEffect, useState } from "react";
import { WrapperContainer } from "../../Base";
import { useAuth } from "../../Context/AuthContext";
import { userRolesValidation } from "../../Helper/helper";
import Addannouncement from "./addannouncement";
import CourseAnnouncement from "./course-announcement";
import HworkDownload from "./hwork-download";
import Hworkstudent from "./hwork-student";
import Hworkteacher from "./hwork-teacher";
import "./profile.css";
const HomeWork = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(0); // Başvurular varsayılan olarak seçili

  const handleClick = (index) => {
    setSelectedItem(index);
  };
  useEffect(() => {
    if (user) {
      setFormData({ firstName: user.firstName, lastName: user.lastName });
    }
  }, [user]);

  const renderContent = () => {
    switch (selectedItem) {
      case 0:
        return <Hworkstudent />;
      case 1:
        return <Hworkteacher />;
      case 2:
        return <CourseAnnouncement />;
      case 3:
        return <Addannouncement />;
      case 4:
        return <HworkDownload />;
      default:
        return null;
    }
  };
  return (
    <div className="LayoutInnerContainer">
      {user && (
        <WrapperContainer alignItems={"start"} justifyContent={"flex-start"}>
          <div xs={3}>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {formData.firstName} {formData.lastName}
                </ListSubheader>
              }
            >
              {userRolesValidation(["Student"]) && (
                <ListItemButton onClick={() => handleClick(0)} selected={selectedItem === 0}>
                  <ListItemIcon>
                    <HomeWorkOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ödevlerim" />
                </ListItemButton>
              )}
              {userRolesValidation(["Admin", "Educator"]) && (
                <ListItemButton onClick={() => handleClick(1)} selected={selectedItem === 1}>
                  <ListItemIcon>
                    <AddHomeWorkOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Yeni Ödev Ekle" />
                </ListItemButton>
              )}
              <ListItemButton onClick={() => handleClick(2)} selected={selectedItem === 2}>
                <ListItemIcon>
                  <NotificationsNoneOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Duyurular" />
              </ListItemButton>
              {userRolesValidation(["Admin", "Educator"]) && (
                <ListItemButton onClick={() => handleClick(3)} selected={selectedItem === 3}>
                  <ListItemIcon>
                    <CampaignOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Duyuru Ekle" />
                </ListItemButton>
              )}
              {userRolesValidation(["Admin", "Educator"]) && (
                <ListItemButton onClick={() => handleClick(4)} selected={selectedItem === 4}>
                  <ListItemIcon>
                    <GetAppOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Yüklenen Ödevler" />
                </ListItemButton>
              )}
            </List>
          </div>

          <div xs={9} className="ContentContainer">
            {renderContent()}
          </div>
        </WrapperContainer>
      )}
    </div>
  );
};

export default HomeWork;
