import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, WrapperContainer } from "../../Base";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import CourseCard from "../../Components/CourseCard/CourseCard";
import CourseDetialCard from "../../Components/CourseDetailCard/CourseDetailCard";
import { Typography } from "@mui/material";
import BaseTab from "../../Base/tab/tab";
import CourseDescription from "./course-description";
import CourseProgram from "./course-program";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../Helper/helper";

const CourseDetail = (props) => {
  const navigate = useNavigate();
  const { courseid } = useParams();
  const { executeGet } = UseApi();
  const [dataSource, setDataSource] = useState();

  const parseDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };
  useEffect(() => {
    if (courseid) {
      executeGet({ url: apiUrls.Courses + `/${courseid}` }).then((res) => {
        if (res && res.success) {
          const cardSource = {
            Kayıt_dönemi:
              parseDate(res?.data?.registerBeginDate) +
              " - " +
              parseDate(res?.data?.registerEndDate),
            Eğitim_dönemi:
              parseDate(res?.data?.courseBeginDate) +
              " - " +
              parseDate(res?.data?.courseEndDate),
            Kontejan:
              (res?.data?.minimumQuota || "") +
              " - " +
              (res?.data?.maximumQuota || ""),
            Belge_türü: res?.data?.documentType,
            Eğitim_Kodu: res?.data?.courseCode,
          };
          setDataSource({
            ...res?.data,
            cardSource,
          });
        }
      });
    }
  }, [courseid]);

  const editCourseClick = () => {
    navigate(`/edit-course/${courseid}`);
  };
  return (
    <div className="LayoutInnerContainer">
      <WrapperContainer alignItems={"start"}>
        <WrapperContainer xs={8}>
          <Typography
            style={{
              color: "grey",
              fontSize: "2rem",
              textAlign: "left",
            }}
            xs={12}
          >
            {dataSource?.name}
          </Typography>
          <BaseTab
            xs={12}
            tabItems={[
              {
                header: "Tanıtım",
                content: <CourseDescription source={dataSource} />,
              },
              {
                header: "Ders Programı",
                content: <CourseProgram source={dataSource} />,
              },
            ]}
          />
        </WrapperContainer>

        <WrapperContainer xs={4}>
          <Button
            userType={[UserRoles.Admin]}
            label={"Kursu düzenle"}
            xs={12}
            onClick={() => editCourseClick()}
          />
          <CourseDetialCard
            xs={12}
            time={450}
            id={dataSource?.id}
            source={dataSource?.cardSource}
          />
        </WrapperContainer>
      </WrapperContainer>
    </div>
  );
};

export default CourseDetail;
