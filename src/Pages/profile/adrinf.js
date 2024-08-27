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
import AdressInformation from "../../Components/AdressDefinition/AdressDefinition";
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

const Adress = () => {
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
          <MapsHomeWorkOutlinedIcon style={{ fontSize: "30px" }} />
          <ListItemText
            primary={
              <Typography
                style={{
                  fontSize: "18px",
                  marginLeft: "20px",
                }}
              >
                İletişim Bilgileri
              </Typography>
            }
          />
        </ListItemButton>
      ),
      content: <AdressInformation userData={formData} />,
      callback: (data) => getUserInfo(),
      width: "sm",
    });
  };
  return (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <MapsHomeWorkOutlinedIcon style={{ fontSize: "30px" }} />
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "18px",
                    marginLeft: "20px",
                  }}
                >
                  İletişim Bilgileri
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <AppCard primary="E posta" secondary={formData.email} />
        <Divider /> 
        <AppCard primary="Cep Telefonu" secondary={formData.phoneNumber} />
        <Divider />
        <AppCard primary="İl" secondary={formData.city} />
        <Divider />
        <AppCard primary="İlçe" secondary={formData.district} />
        <Divider />
        <AppCard primary="İletişim Adresi" secondary={formData.address} />
        <Divider />     
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

export default Adress;
