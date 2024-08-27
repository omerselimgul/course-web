import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import AppCard from "../../Components/AppCard/AppCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useAuth } from "../../Context/AuthContext";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { Input } from "../../Base";
import MenuItem from "@mui/material/MenuItem";
import { convertDateTimeToDate } from "../../Helper/helper";
import DatePicker from "../../Base/date/date";
import { useFormManager } from "../../Context/FormManagerContext";
import AddIdentity from "../../Components/AddIdentity/add-identity";

const Identity = () => {
  const { executeGet } = UseApi();
  const { user } = useAuth();
  const { openDialog } = useFormManager();
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

  const editIdentitfyInformation = () => {
    openDialog({
      title: (
        <ListItemButton disablePadding>
          <BadgeOutlinedIcon style={{ fontSize: "30px" }} />
          <ListItemText
            primary={
              <Typography
                style={{
                  fontSize: "18px",
                  marginLeft: "20px",
                }}
              >
                Kimlik Bilgileri
              </Typography>
            }
          />
        </ListItemButton>
      ),
      content: <AddIdentity userData={formData} />,
      callback: (data) => getUserInfo(),
      width: "sm",
    });
  };

  return (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <BadgeOutlinedIcon style={{ fontSize: "30px" }} />
            <ListItemText primary={<Typography style={{ fontSize: "18px", marginLeft: "20px" }}>Kimlik Bilgileri</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <AppCard primary="Adı" secondary={formData.firstName} />
        <Divider />
        <AppCard primary="Soyadı" secondary={formData.lastName} />
        <Divider />
        <AppCard primary="TC Kimlik No" secondary={formData.identifyNumber} />
        <Divider />
        <AppCard primary="Doğum Tarihi" secondary={convertDateTimeToDate(formData.birthDate)} />
        <Divider />
        <AppCard primary="Cinsiyet" secondary={formData.gender} />
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
          onClick={() => editIdentitfyInformation()}
        />
      </div>
      {/* <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div style={{ padding: "20px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <BadgeOutlinedIcon style={{ fontSize: "30px" }} />
                <ListItemText
                  primary={
                    <Typography
                      style={{ fontSize: "18px", marginLeft: "20px" }}
                    >
                      Kimlik Bilgileri
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />

            <AppCard
              primary="Adı"
              secondary={
                <Input
                  name="firstName"
                  defaultValue={formData.firstName}
                  fullWidth
                  variant="outlined"
                  value={formData.firstName}
                  onChange={(e) =>
                    inputChangeHandler("firstName", e.target.value)
                  }
                />
              }
            />
            <AppCard
              primary="Soyadı"
              secondary={
                <Input
                  name="lastName"
                  defaultValue={formData.lastName}
                  fullWidth
                  variant="outlined"
                  value={formData.lastName}
                  onChange={(e) =>
                    inputChangeHandler("lastName", e.target.value)
                  }
                />
              }
            />
            <Divider />
            <AppCard
              primary="TC Kimlik No"
              secondary={
                <Input
                  name="identifyNumber"
                  defaultValue={formData.identifyNumber}
                  fullWidth
                  variant="outlined"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  value={formData.identifyNumber}
                  onChange={(e) =>
                    inputChangeHandler("identifyNumber", e.target.value)
                  }
                />
              }
            />
            <Divider />
            <AppCard
              primary="Doğum Tarihi"
              secondary={
                <DatePicker
                onChange={(e) =>
                         inputChangeHandler("birthDate", e.target.value)
                       }
                xs={3}
             
                value={formData.birthDate}
              />
              }
            />
            <Divider />
            <AppCard
              primary="Cinsiyet"
              secondary={
                <Input
                  name="gender"
                  defaultValue={formData.gender}
                  fullWidth
                  variant="outlined"
                  value={formData.gender}
                  onChange={(e) => inputChangeHandler("gender", e.target.value)}
                  select
                >
                  <MenuItem value="kadın">Kadın</MenuItem>
                  <MenuItem value="erkek">Erkek</MenuItem>
                </Input>
              }
            />
          </List>
          <Button
            onClick={handleSaveClick}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", marginLeft: "310px" }}
          >
            Güncelle
          </Button>
        </div>
      </Dialog> */}
    </div>
  );
};

export default Identity;
