import React, { useEffect, useRef } from "react";
import { Button } from "../../Base";
import { Typography } from "@mui/material";
import "./HworkCard.css";
import AOS from "aos";
import "aos/dist/aos.css";
import FileUpload from "../../Base/file-upload/file-upload";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";
import { useAuth } from "../../Context/AuthContext";

const HworkCard = ({ id, data, title, status, category, animationTime, quota, onUploadClick, onClick, courseid, close, ...props }) => {
  const fileInputRef = useRef();
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    let defaultTime = 2000;
    if (animationTime) defaultTime = animationTime;

    AOS.init(defaultTime);
  }, []);

  const sendHomeWork = async () => {
    const hworkFile = await fileInputRef.current.save();

    const payload = {
      id: data?.studentHomeworkId || 0,
      HomeWorkId: data?.homeWorkId,
      userId: user?.userId,
      homeWorkFile: hworkFile,
      sendDate: new Date(),
      courseId: data?.courseId,
    };

    await executeAsync({
      url: apiUrls.studentHomeworks,
      method: "POST",
      data: payload,
    }).then((res) => {
      if (res.success)
        enqueueSnackbar("Ödev başarıyla yüklendi", {
          variant: "success",
        });
      close && close();
    });
  };

  return (
    <div className="hwork-card-container" data-aos="zoom-in">
      <div className="hwork-card">
        <div className="hwork-content">
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Açıklama
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontSize: "0.95rem",
              wordWrap: "break-word",
              margin: "20px 0px",
            }}
          >
            {data?.description}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" style={{ textAlign: "left" }}>
              {title}
            </Typography>
            <Typography variant="body2" style={{ color: "grey", fontSize: "0.9rem", textAlign: "right" }}>
              {status}
            </Typography>
          </div>

          {/* <Button
            label={<label htmlFor={1}>+ Ekle veya Oluştur </label>}
            variant={"contained"}
            className={"hwork-button"}
            onClick={() => fileInputRef.current.focus()}
          /> */}
          <FileUpload Id={1} ref={fileInputRef} value={data?.homeWorkFile} />

          <Button
            label={"Tamamlandı Olarak İşaretle"}
            variant={"contained"}
            style={{ backgroundColor: "#E7643E", marginTop: "0.5rem" }}
            onClick={() => sendHomeWork()}
          />
        </div>
      </div>
    </div>
  );
};

export default HworkCard;
