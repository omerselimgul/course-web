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

  const highSchoolDiplomaRef = useRef();
  const highSchoolRef = useRef();
  const highSchoolGradiationDateRef = useRef();
  const universityRef = useRef();
  const universityDepartmentRef = useRef();
  const universityGradiationDateRef = useRef();
  const universityFileRef = useRef();

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const saveClick = async () => {
    const highSchoolDiplomaId = await highSchoolDiplomaRef.current.save();
    const universityDiplomaId = await universityFileRef.current.save();

    let payload = {
      highSchool: highSchoolRef.current && highSchoolRef.current.value,
      highSchoolGradiationDate: highSchoolGradiationDateRef.current && highSchoolGradiationDateRef.current.value,
      highSchoolFile: highSchoolDiplomaId,
      university: universityRef.current && universityRef.current.value,
      universityDepartment: universityDepartmentRef.current && universityDepartmentRef.current.value,
      universityGradiationDate: universityGradiationDateRef.current && universityGradiationDateRef.current.value,
      universityFile: universityDiplomaId,
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
            <Input ref={highSchoolRef} label={"Lise"} name="highSchool" value={formData.highSchool} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <DatePicker ref={highSchoolGradiationDateRef} label={"Lise Mezuniyet tarihi"} xs={3} value={formData.highSchoolGradiationDate} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <FileUpload ref={highSchoolDiplomaRef} xs={4} name="universityFile" label={"Lise diploma:"} value={formData.highSchoolFile} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={universityRef} name="university" value={formData.university} label="üniversite" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Input ref={universityDepartmentRef} name="universityDepartment" value={formData.universityDepartment} label="Bölüm" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <DatePicker ref={universityGradiationDateRef} xs={3} value={formData.universityGradiationDate} label="Mezuniyet tarihi" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <FileUpload ref={universityFileRef} name="universitydiploma" label="Üniversite diploması" value={formData.universityFile} />
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
