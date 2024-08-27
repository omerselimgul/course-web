import React, { useEffect, useState } from "react";
import { WrapperContainer, Input, Button } from "../../Base";
import { useFormManager } from "../../Context/FormManagerContext";
import { UseApi } from "../../Context/Api/useApi";
import AddTeacher from "../add-teacher/add-teacher";
import EducaterCard from "../../Components/EducaterCard/EducaterCard";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UserRoles } from "../../Helper/helper";

function Teachers() {
  const { executeGet } = UseApi();
  const [educatorsData, setEducatorsData] = useState([]);
  const { openDialog } = useFormManager();

  // State to trigger re-render when a teacher is added
  const [teacherAdded, setTeacherAdded] = useState(false);

  useEffect(() => {
    // API'den eğitmen verilerini alma
    const fetchData = async () => {
      try {
        const response = await executeGet({ url: apiUrls.Educators });
        setEducatorsData(response.data);
      } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error);
      }
    };

    fetchData();
  }, [teacherAdded]); // teacherAdded durumu değiştiğinde yeniden yükle

  const dialogHandler = () => {
    openDialog({ title: "Eğitmen Ekle", content: <AddTeacher onTeacherAdded={handleTeacherAdded} />, width: "sm" });
  };

  const handleTeacherAdded = () => {
    setTeacherAdded(!teacherAdded); // Yeniden render etmek için teacherAdded durumunu değiştir
  };

  return (
    <WrapperContainer className={"LayoutInnerContainer"}>
      <h1 xs={12}> Eğitmenler </h1>

      <WrapperContainer justifyContent={"space-between"}>
        <Input xs={4} label="Eğitmen Arayınız.." variant="outlined" />
        <Button
          userType={[UserRoles.Admin]}
          xs={2}
          variant="contained"
          onClick={() => {
            dialogHandler();
          }}
          label={"EĞİTMEN EKLE"}
        />
      </WrapperContainer>
      {educatorsData.map((item, index) => (
        <EducaterCard xs={3} key={index} title={`${item.firstName} ${item.lastName}`} link={item.educatorAvesisLink} />
      ))}
    </WrapperContainer>
  );
}

export default Teachers;
