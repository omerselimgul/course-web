import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AppCard from "../AppCard/AppCard";
import { Button, Input } from "../../Base";
import DatePicker from "../../Base/date/date";
import FileUpload from "../../Base/file-upload/file-upload";
import { useEffect, useRef, useState } from "react";
import { UseApi } from "../../Context/Api/useApi";
import { useAuth } from "../../Context/AuthContext";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";

const EducationInformation = ({ userData, close, ...props }) => {
  const { user } = useAuth();
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({});

  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const saveClick = async () => {
   
    let payload = {
        email: emailRef.current && emailRef.current.value,
        phoneNumber: phoneNumberRef.current && phoneNumberRef.current.value,
 
        city: cityRef.current && cityRef.current.value,
        district: districtRef.current && districtRef.current.value,
        address: addressRef.current && addressRef.current.value,
   
    };

    const url = apiUrls.User + "/" + user.userId;
    executeAsync({
      url: url,
      method: "PUT",
      data: payload,
    }).then((res) => {
      if (res?.success) {
        enqueueSnackbar("Başarıyla tamamlandı", {
          variant: "success",
        });
        close && close();
      }
    });
  };
  return (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={emailRef} label={"E posta"} name="email" value={formData.email} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={phoneNumberRef} label={"Cep Telefonu"}  value={formData.phoneNumber} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={cityRef} name="city" value={formData.city} label="İl" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={districtRef} name="district" value={formData.district} label="İlçe" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={addressRef} value={formData.address} label="İletişim Adresi" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <Button label={"Kaydet"} variant="outlined" onClick={() => saveClick()} />
        </ListItem>
      </List>
    </div>
  );
};

export default EducationInformation;
