import React, { useEffect, useRef, useState } from "react";
import HworkCard from "../../Components/HworkCard/HworkCard";
import HworkDetailCard from "../../Components/HworkDetailCard/HworkDetailCard";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { WrapperContainer } from "../../Base";
import FileUpload from "../../Base/file-upload/file-upload";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useAuth } from "../../Context/AuthContext";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useParams } from "react-router-dom";
import { useFormManager } from "../../Context/FormManagerContext";
import { createDateFromDateTime } from "../../Helper/helper";

const Hworkstudent = (item) => {
  const [submissionStatus] = useState("Atandı"); // Başlangıç durumu Atandı olarak ayarlandı
  const { courseid } = useParams();
  const { executeGet } = UseApi();
  const { user } = useAuth();
  const [formData, setFormData] = useState([]);
  const { openDialog } = useFormManager();

  const now = new Date();

  const courseDetailClick = (item) => {
    openDialog({
      title: "Ödev Yükleme",
      content: <HworkCard title={`Çalışmanız`} status={` ${submissionStatus}`} courseid={courseid} data={item} id={item?.Id} />,
      callback: (data) => getData(),
      width: "sm",
    });
  };

  useEffect(() => {
    if (courseid) {
      getData();
    }
  }, [courseid]);

  const getData = () => {
    executeGet({
      url: apiUrls.studentHomeworks + `?userid=${user?.userId}&courseid=${courseid}`,
    })
      .then((response) => {
        if (response.success) {
          setFormData(response.data);
        } else {
          console.error("Kullanıcıya ait veri bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
      });
  };

  return (
    <div xs={12}>
      <WrapperContainer xs={12} justifyContent={"flex-start"} margin={"16px 0px"} padding={"0px 16px"}>
        {formData.map((item, index) => (
          <HworkDetailCard
            key={index}
            xs={6}
            data={item}
            title={item.homeworkHeader}
            starttime={item.dateofAssigment}
            finishtime={item.deadlineDate}
            description={item.description}
            category={item.status}
            assigmentHref={item?.assigmentFile}
            homeWorkFile={item?.homeWorkFile}
            onClick={() => courseDetailClick(item)}
            isOutOfDate={now > createDateFromDateTime(item?.deadlineDate)}
          />
        ))}
      </WrapperContainer>
    </div>
  );
};

export default Hworkstudent;
