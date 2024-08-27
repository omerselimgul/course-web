import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Input, Button, Card } from "../../Base";
import FileUpload from "../../Base/file-upload/file-upload";
import { useAuth } from "../../Context/AuthContext";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import DatePicker from "../../Base/date/date";

const Hworkteacher = () => {
  const hworkRef = useRef();
  const deadlineDateRef = useRef();
  const dateofAssigmentRef = useRef();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});

  const { executeGet, executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();
  const { courseid } = useParams();

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (courseid) {
      executeGet({ url: apiUrls.Courses + "/" + courseid }).then((res) => {
        if (res.success) {
          setFormData((prevState) => ({
            ...prevState,
            courseName: res?.data?.name,
            courseid: courseid,
          }));
        }
      });
    }
  }, [courseid]);

  const inputChangeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUploadAsComplete = async () => {
    const assigmentFile = await hworkRef.current.save();
    const paylaod = {
      ...formData,
      EducatorId: user.userId,
      courseid: courseid,
      AssigmentFile: assigmentFile,
      DateofAssigment:
        dateofAssigmentRef.current && dateofAssigmentRef.current.value,
      DeadlineDate: deadlineDateRef.current && deadlineDateRef.current.value,
      status: 0,
    };

    executeAsync({
      url: apiUrls.homework,
      method: "POST",
      data: paylaod,
      spinner: true,
    }).then((res) => {
      if (res?.success) {
        enqueueSnackbar("Ödev yükleme başarıyla tamamlandı", {
          variant: "success",
        });
      }
    });
  };

  return (
    <Card>
      <Typography variant="h6" gutterBottom>
        Ödev Detayları
      </Typography>
      <Input
        xs={6}
        fullWidth
        name="homeworkHeader"
        rows={3}
        label="Ödev Başlığı"
        value={formData?.homeworkHeader}
        onBlur={(value) => inputChangeHandler("homeworkHeader", value)}
      />
      <Input
        multiline
        rows={5}
        fullWidth
        name="description"
        label="Ödev Açıklaması"
        value={formData?.description}
        onBlur={(value) => inputChangeHandler("description", value)}
      />

      <DatePicker
        ref={dateofAssigmentRef}
        xs={6}
        label="Başlangıç Tarihi"
        value={formData.dateofAssigment}
        required
      />
      <DatePicker
        ref={deadlineDateRef}
        xs={6}
        value={formData.deadlineDate}
        label="Son Yükleme Tarihi"
        required
      />

      <FileUpload
        label={"Ödev Dosyasını Yükle:"}
        xs={5.3}
        ref={hworkRef}
        name="hworkFile"
      />

      <Button
        variant="contained"
        onClick={handleFileUploadAsComplete}
        label={"Onay"}
      ></Button>
    </Card>
  );
};

export default Hworkteacher;
