import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "../../Base";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";
import { useAuth } from "../../Context/AuthContext";

const Allannounce = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});

  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
      }));
    }
  }, [user]);

  const inputChangeHandler = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUploadAsComplete = async () => {
    const paylaod = {
      ...formData,
    };

    executeAsync({
      url: apiUrls.announcement,
      method: "POST",
      data: paylaod,
      spinner: true,
    }).then((res) => {
      if (res?.success) {
        enqueueSnackbar("Duyuru ekleme başarıyla tamamlandı", {
          variant: "success",
        });
      }
    });
  };

  return (
    <div className="LayoutInnerContainer">
      <Card>
        <Typography variant="h6" gutterBottom>
          Duyuru Detayları
        </Typography>
        <Input
          xs={12}
          fullWidth
          name="header"
          rows={3}
          label="Duyuru Başlığı"
          value={formData?.header}
          onBlur={(value) => inputChangeHandler("header", value)}
        />
        <Input
          multiline
          rows={12}
          fullWidth
          name="description"
          label="Duyuru Açıklaması"
          value={formData?.description}
          onBlur={(value) => inputChangeHandler("description", value)}
        />
        <Button variant="contained" onClick={handleFileUploadAsComplete} label={"Duyuru Yayınla"} />
      </Card>
    </div>
  );
};

export default Allannounce;
