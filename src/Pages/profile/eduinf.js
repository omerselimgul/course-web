import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AppCard from "../../Components/AppCard/AppCard";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { useAuth } from "../../Context/AuthContext";
import { convertDateTimeToDate } from "../../Helper/helper";
import { useFormManager } from "../../Context/FormManagerContext";
import EducationInformation from "../../Components/EducationDefinition/EducationDefinition";

const Eduinf = () => {
  const { executeGet } = UseApi();
  const { openDialog } = useFormManager();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user && !formData.userId) {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = () => {
    executeGet({ url: apiUrls.User + "/" + user.userId })
      .then((response) => {
        if (response.success) {
          setFormData(response.data); // Assuming API response contains all user data
        } else {
          console.error("Kullanıcıya ait veri bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
      });
  };

  const editEductaionInformation = () => {
    openDialog({
      title: (
        <ListItemButton disablePadding>
          <SchoolOutlinedIcon style={{ fontSize: "30px" }} />
          <ListItemText
            primary={
              <Typography
                style={{
                  fontSize: "18px",
                  marginLeft: "20px",
                }}
              >
                Eğitim Bilgileri
              </Typography>
            }
          />
        </ListItemButton>
      ),
      content: <EducationInformation userData={formData} />,
      callback: (data) => getUserInfo(),
      width: "sm",
    });
  };
  return (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <SchoolOutlinedIcon style={{ fontSize: "30px" }} />
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    marginLeft: "20px",
                  }}
                >
                  Eğitim Bilgileri
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <AppCard primary="Lise" secondary={formData.highSchool} />
        <Divider />
        <AppCard primary="Mezuniyet Tarihi" secondary={convertDateTimeToDate(formData.highSchoolGradiationDate)} />
        <Divider />
        <AppCard
          primary="Lise Diploması"
          secondary={
            <a href={formData.highSchoolFile} target="_blank" rel="noreferrer">
              <FindInPageIcon />
            </a>
          }
        />
        <Divider />
        <AppCard primary="Üniversite" secondary={formData.university} />
        <Divider />
        <AppCard primary="Bölüm" secondary={formData.universityDepartment} />
        <Divider />
        <AppCard primary="Mezuniyet Tarihi" secondary={convertDateTimeToDate(formData.universityGradiationDate)} />
        <Divider />
        <AppCard
          primary="Üniversite Diploması"
          secondary={
            <a href={formData.universityFile} target="_blank" rel="noreferrer">
              <FindInPageIcon />
            </a>
          }
        />
      </List>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <SaveAsOutlinedIcon
          style={{
            position: "absolute",
            right: 0,
            top: 10,
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={() => editEductaionInformation()}
        />
      </div>
    </div>
  );
};

export default Eduinf;
