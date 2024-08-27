import React, { useEffect, useState } from "react";
import { UseApi } from "../../Context/Api/useApi";
import { BoxWrapper, WrapperContainer } from "../../Base";
import CourseCard from "../../Components/CourseCard/CourseCard";
import { Typography } from "@mui/material";
import courseCardBack from "./courseback.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useFormManager } from "../../Context/FormManagerContext";
import Login from "../login/login";
import Announce from "../../Components/Announce/Announce";
import "./Home.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { executeGet } = UseApi();
  const { openDialog } = useFormManager();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    executeGet({ url: apiUrls.Courses }).then((res) => {
      if (res?.success && res?.data && res.data?.length > 0) {
        setCourses([...res.data]);
      }
    });
  }, []);

  useEffect(() => {
    if (location && location.pathname.includes("login")) {
      loginClick();
    }
  }, [navigate]);

  const loginClick = () => {
    openDialog({
      title: "Giriş yap",
      content: <Login />,
      width: "sm",
    });
  };

  const navigateToAllCourse = () => {
    navigate("/all-courses");
  };

  const courseDetailClick = (id) => {
    navigate(`/course-detail/${id}`);
  };

  useEffect(() => {
    executeGet({ url: apiUrls.announcement })
      .then((response) => {
        if (response.success && Array.isArray(response.data)) {
          setAnnouncements(response.data);
        } else {
          console.error("Duyuru verisi bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
      });
  }, []);

  return (
    <>
      <div className="homepage-image" style={{ display: 'flex', alignItems: 'center', paddingLeft: '120px' }}>
        <Announce 
          announcements={announcements}
          animationTime={200}
        />
      </div>

      <div className="LayoutInnerContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5">Aktif Eğitimler</Typography>

          <Typography
            className="link"
            onClick={(event) => navigateToAllCourse()}
          >
            Tüm Eğitimler <i className="arrow right"></i>{" "}
          </Typography>
        </div>

        <WrapperContainer
          inner
          margin={"20px 0px"}
          padding={"0px 16px"}
        >
          {courses.length > 0 && courses.map((item) => (
            <CourseCard
              key={item.id}
              image={courseCardBack}
              title={item?.name}
              time={item?.time}
              category={item?.category}
              onClick={() => courseDetailClick(item?.id)}
              xs={3.8}
            />
          ))}
        </WrapperContainer>
      </div>
    </>
  );
};

export default Home;
