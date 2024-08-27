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
import SelectInput from "../../Base/select/select";

const AddIdentity = ({ userData, close, ...props }) => {
  const { user } = useAuth();
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({});

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const identifyNumberRef = useRef();
  const birthDateRef = useRef();
  const genderRef = useRef();

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const saveClick = async () => {
    let payload = {
      firstName: firstNameRef.current && firstNameRef.current.value,
      lastName: lastNameRef.current && lastNameRef.current.value,
      identifyNumber: identifyNumberRef.current && identifyNumberRef.current.value,
      birthDate: birthDateRef.current && birthDateRef.current.value,
      gender: genderRef.current && genderRef.current.value,
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
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <Input label={"Adı"} ref={firstNameRef} value={formData.firstName} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <Input label={"Soy adı"} ref={lastNameRef} value={formData.lastName} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <Input label={"Kimlik numarası"} ref={identifyNumberRef} value={formData.identifyNumber} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <DatePicker ref={birthDateRef} xs={3} value={formData.birthDate} label={"Doğum Tarihi"} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <SelectInput
            ref={genderRef}
            label="Cinsiyet"
            name="gender"
            value={formData.gender}
            required
            valuePath="field"
            labelPath="value"
            dataSource={[
              {
                field: "erkek",
                value: "erkek",
              },
              {
                field: "kadın",
                value: "kadın",
              },
            ]}
          />
        </ListItemButton>
      </ListItem>

      <Button label={"Kaydet"} variant="outlined" onClick={() => saveClick()} />
    </List>
  );
};

export default AddIdentity;
