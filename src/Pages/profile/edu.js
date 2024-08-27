import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WrapperContainer } from "../../Base";
import CourseCard from "../../Components/CourseCard/CourseCard";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";
import { useAuth } from "../../Context/AuthContext";
import webImg from "./mobil.jpg";
import { isNullOrUndefinedOrEmpty } from "../../Helper/helper";
const Edu = () => {
  const { executeGet } = UseApi();
  const { user } = useAuth();
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNullOrUndefinedOrEmpty(user)) fetchData();
  }, [user]);

  const fetchData = async () => {
    const userId = user.userId;

    await executeGet({
      url: apiUrls.Courses + `/geybyuserid?userId=${userId}&`,
    }).then(async (response) => {
      if (response?.data && response.data.length > 0) {
        setCourseData([...response.data]);
      }
    });
  };

  const detailClick = (id) => {
    navigate("/hwork/" + id);
  };

  return (
    <div>
      <WrapperContainer xs={12} justifyContent={"flex-start"} margin={"10px 0px"} padding={"0px 16px"}>
        {courseData?.map((course, index) => (
          <CourseCard
            key={index}
            xs={6}
            title={course?.name}
            image={webImg}
            id={course?.id}
            closeTimeIcon
            closePersonIcon
            quota={course?.quota}
            buttonName={"Ders'e git"}
            onClick={(id) => detailClick(id)}
          />
        ))}
      </WrapperContainer>
    </div>
  );
};

export default Edu;
