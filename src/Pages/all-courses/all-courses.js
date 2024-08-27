import React, { useEffect, useState } from "react";
import { Button, WrapperContainer } from "../../Base";
import CourseCard from "../../Components/CourseCard/CourseCard";
import webImg from "./mobil.jpg";
import { UseApi } from "../../Context/Api/useApi";
import { useNavigate } from "react-router-dom";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UserRoles } from "../../Helper/helper";

const AllCourses = () => {
  const { executeGet } = UseApi();
  const navigate = useNavigate();

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    executeGet({ url: apiUrls.Courses })
      .then((res) => {
        if (res && res.success && res.data) {
          setCourseList(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addCourseClick = () => {
    navigate("/add-course");
  };

  const courseDetailClick = (id) => {
    navigate(`/course-detail/${id}`);
  };

  return (
    <>
      <WrapperContainer
        alignItems="flex-start"
        justifyContent={"flex-start"}
        className="LayoutInnerContainer"
      >
        {/* <WrapperContainer xs={4}> */}
        <Button
          userType={[UserRoles.Admin]}
          variant="contained"
          xs={6}
          label={"Kurs ekle"}
          style={{ backgroundColor: "inherit" }}
          onClick={(event) => addCourseClick()}
        />
        {/* <div
            xs={12}
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <WrapperContainer>
              <label
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
                xs={12}
              >
                Kategoriler
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Programlama
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Veri Bilimi
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "20px" }}>
                <input type="checkbox" /> Uygulama Geliştirme
              </label>

              <label
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
                xs={12}
              >
                Eğitim Ortamı
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Yüz Yüze Eğitim
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Çevrim İçi Eğitim
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Hibrit Eğitim
              </label>
              <label xs={12} style={{ fontSize: "17px", marginBottom: "5px" }}>
                <input type="checkbox" /> Offline Eğitim
              </label>
            </WrapperContainer>
          </div>*/}
        {/* </WrapperContainer> */}

        <WrapperContainer
          xs={12}
          justifyContent={"flex-start"}
          margin={"16px 0px"}
          padding={"0px 16px"}
        >
          {courseList?.length > 0 &&
            courseList.map((item) => (
              <CourseCard
                xs={4}
                title={item?.name}
                image={webImg}
                time={450}
                id={item?.id}
                onClick={() => courseDetailClick(item?.id)}
                quota={item?.quota}
              />
            ))}
        </WrapperContainer>
      </WrapperContainer>
    </>
  );
};

export default AllCourses;
