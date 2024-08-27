import React, { useRef, useState } from "react";
import { Input, ImgUploader } from "../../Base";

import FormBase from "../../Base/form-base/form-base";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";
import { Email } from "@mui/icons-material";

const AddTeacher = ({ onTeacherAdded, close }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { executeAsync } = UseApi();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    link: "",
  });

  const [key, setKey] = useState(0); // State for triggering re-render

  const nameRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const imgHandler = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  const handleAddEgitmen = () => {
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
      email: formData.email,
      educatoravesislink: formData.link,
      roles: ["educator"],
    };
    executeAsync({
      url: apiUrls.Authentication,
      method: "POST",
      data: payload,
    }).then((res) => {
      console.log(res);
      if (res && res?.success) {
        // localStorage.setItem("user", JSON.stringify(res?.data));
        enqueueSnackbar("Başarıyla kayıt işleminiz gerçekleşti!", {
          variant: "success",
        });
      }
      setKey((prevKey) => prevKey + 1); // Increment key to trigger re-render
      onTeacherAdded(); // Notify parent component
      close && close();
    });
  };

  const actionList = [
    { label: "Kaydet", onClick: handleAddEgitmen, type: "validate" },
  ];
  return (
    <FormBase actionList={actionList}>
      <ImgUploader
        xs={12}
        value={"/images/educator_avatar.jpg"}
        disableAction
      />
      <Input
        ref={nameRef}
        xs={6}
        label="İsim"
        variant="outlined"
        name="firstname"
        value={formData.firstname}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Input
        xs={6}
        label="Soy İsim"
        variant="outlined"
        name="lastname"
        value={formData.lastname}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Input
        xs={6}
        label="Kullanıcı Adı"
        variant="outlined"
        name="username"
        value={formData.username}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Input
        xs={6}
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Input
        xs={12}
        label="Avesis Linki"
        variant="outlined"
        name="link"
        value={formData.educatoravesislink}
        onChange={(event) => handleInputChange(event)}
        required
      />
    </FormBase>
  );
};

export default AddTeacher;
