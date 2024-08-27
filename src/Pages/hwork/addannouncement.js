import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input } from "../../Base";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";

const Addannouncement = () => {
  const [formData, setFormData] = useState({});
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();
  const { courseid } = useParams();

  const inputChangeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUploadAsComplete = async () => {
    if (courseid) {
      const paylaod = {
        ...formData,
        courseId: courseid,
      };

      executeAsync({
        url: apiUrls.courseAnnouncement,
        method: "POST",
        data: paylaod,
        spinner: true,
      }).then((res) => {
        if (res?.success) {
          enqueueSnackbar("Duyuru yükleme başarıyla tamamlandı", {
            variant: "success",
          });
        }
      });
    }
  };

  return (
    <Card>
      <Typography variant="h6" gutterBottom>
        Duyuru Detayları
      </Typography>
      <Input xs={12} fullWidth label="Duyuru Başlığı" value={formData?.header} onBlur={(value) => inputChangeHandler("header", value)} />
      <Input
        multiline
        rows={12}
        fullWidth
        label="Duyuru Açıklaması"
        value={formData?.description}
        onBlur={(value) => inputChangeHandler("description", value)}
      />
      <Button onClick={handleFileUploadAsComplete} label={"Duyuru Ekle"} />
    </Card>
  );
};

export default Addannouncement;
