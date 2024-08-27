import React, { useEffect, useId, useRef, useState } from "react";
import { Input } from "../../Base";
import Typography from "@mui/material/Typography";
import { UseApi } from "../../Context/Api/useApi";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import ApplicationCard from "../../Components/ApplicationCard/ApplicationCard";
import FormBase from "../../Base/form-base/form-base";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useAuth } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import FileUpload from "../../Base/file-upload/file-upload";
import { useLoadingSpinner } from "../../Context/LoadingSpinnerContext";
import DatePicker from "../../Base/date/date";
import SelectInput from "../../Base/select/select";
import { useSnackbar } from "notistack";

const ApplicationsPage = () => {
  const { executeAsync, executeGet } = UseApi();
  const { user } = useAuth();
  const { courseId, applicationId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { openSpinner } = useLoadingSpinner();
  const [formData, setFormData] = useState({});

  const highSchoolDiplomaRef = useRef();
  const collageDiplomaRef = useRef();

  useEffect(() => {
    if (user) {
      executeGet({ url: apiUrls.User + "/" + user.userId }).then((res) => {
        if (res.success) {
          setFormData((prevState) => ({
            ...prevState,
            ...res.data,
          }));
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (courseId) {
      executeGet({ url: apiUrls.Courses + "/" + courseId }).then((res) => {
        if (res.success) {
          setFormData((prevState) => ({
            ...prevState,
            courseName: res?.data?.name,
            courseId: courseId,
          }));
        }
      });
    }
  }, [courseId]);

  const handleSave = async () => {
    if (user.userId && courseId) {
      openSpinner();
      const highSchoolDiplomaId = await highSchoolDiplomaRef.current.save();
      const collageDiplomaId = await collageDiplomaRef.current.save();

      const payload = {
        ...formData,
        userId: user.userId,
        status: 0,
        highSchoolFile: highSchoolDiplomaId,
        universityFile: collageDiplomaId,
        courseId: courseId,
      };

      await executeAsync({
        url: apiUrls.Application,
        method: "POST",
        data: payload,
        spinner: true,
      }).then((res) => {
        if (res.success)
          enqueueSnackbar("Başvuru başarıyla yapıldı", {
            variant: "success",
          });
      });
    }
  };

  const saveClick = () => {
    handleSave();
  };

  const actionList = [
    {
      label: "Kaydet ve devam et",
      type: "validate",
      xs: "3",
      onClick: saveClick,
    },
  ];

  const inputChangeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <FormBase closeButton actionList={actionList} className="LayoutInnerContainer">
      <h2 xs={12} style={{ marginBottom: "15px" }}>
        {formData?.courseName}
      </h2>

      <ApplicationCard xs={12} header={"Kimlik Bilgileri"} headerIcon={<BadgeOutlinedIcon />}>
        <Input xs={4} label="Adı" name="firstName" value={formData?.firstName} onBlur={(value) => inputChangeHandler("firstName", value)} />
        <Input xs={4} label="Soyadı" name="lastName" value={formData?.lastName} onBlur={(value) => inputChangeHandler("lastName", value)} />
        <Input
          xs={4}
          label="TC Kimlik No"
          name="identifyNumber"
          required
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          value={formData?.identifyNumber}
          onBlur={(value) => inputChangeHandler("identifyNumber", value)}
        />
        <SelectInput
          xs={4}
          label="Cinsiyet"
          name="gender"
          value={formData.gender}
          required
          onChange={(value) => inputChangeHandler("gender", value)}
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
        <DatePicker
          xs={4}
          label="Doğum Tarihi"
          name="birthDate"
          value={formData.birthDate}
          onBlur={(value) => inputChangeHandler("birthDate", value)}
          required
        />
      </ApplicationCard>

      <ApplicationCard xs={12} header={"Eğitim Bilgileri"} headerIcon={<SchoolOutlinedIcon />}>
        <Typography style={{ fontSize: "1rem" }} xs={12}>
          Lise Bilgileri
        </Typography>
        <Input
          xs={6}
          label="Okul Adı"
          required
          name="highSchool"
          value={formData.highSchool}
          onBlur={(value) => inputChangeHandler("highSchool", value)}
        />
        <DatePicker
          xs={6}
          label="Mezuniyet Tarihi"
          name="highSchoolGradiationDate"
          required
          value={formData.highSchoolGradiationDate}
          onBlur={(value) => inputChangeHandler("highSchoolGradiationDate", value)}
        />

        <FileUpload
          ref={highSchoolDiplomaRef}
          xs={4}
          required
          value={formData.highSchoolFile}
          name="highSchoolFile"
          label={"diploma:"}
          Id={useId()}
        />
        <br xs={12} />
        <Typography style={{ fontSize: "1rem" }} xs={12}>
          Üniversite Bilgileri
        </Typography>
        <Input
          xs={6}
          label="Okul Adı"
          required
          name="university"
          value={formData.university}
          onBlur={(value) => inputChangeHandler("university", value)}
        />
        <DatePicker
          xs={6}
          required
          name="universityGradiationDate"
          label="Mezuniyet Tarihi"
          value={formData.universityGradiationDate}
          onBlur={(value) => inputChangeHandler("universityGradiationDate", value)}
        />
        <Input
          xs={6}
          label="Bölüm"
          required
          name="universityDepartment"
          value={formData.universityDepartment}
          onBlur={(value) => inputChangeHandler("universityDepartment", value)}
        />

        <FileUpload ref={collageDiplomaRef} xs={4} required name="universityFile" value={formData.universityFile} label={"diploma:"} Id={useId()} />
      </ApplicationCard>

      <ApplicationCard xs={12} headerIcon={<PersonOutlineOutlinedIcon />} header={"Kişisel Bilgiler"}>
        <Input xs={6} label="E posta" required name="email" value={formData.email} onChange={(event) => handleInputChange(event)} />
        <Input
          xs={6}
          label="Cep Telefonu"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={(event) => handleInputChange(event)}
        />
        <Input required xs={6} label="İl" name="city" value={formData.city} onChange={(event) => handleInputChange(event)} />
        <Input xs={6} label="İlçe" name="district" required value={formData.district} onChange={(event) => handleInputChange(event)} />
        <Input
          xs={12}
          label="İletişim Adresi"
          multiline
          name="address"
          rows={3}
          required
          value={formData.address}
          onChange={(event) => handleInputChange(event)}
        />
      </ApplicationCard>
    </FormBase>
  );
};

export default ApplicationsPage;
