import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WrapperContainer } from "../../Base";
import AnnouncementCard from "../../Components/AnnouncementCard/AnnouncementCard";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";
import { isNullOrUndefinedOrEmpty } from "../../Helper/helper";

const CourseAnnouncement = () => {
  const [dataSource, setDataSource] = useState([]);
  const { executeGet } = UseApi();
  const { courseid } = useParams();

  useEffect(() => {
    if (!isNullOrUndefinedOrEmpty(courseid)) {
      getCourseAnnouncement();
    }
  }, [courseid]);

  const getCourseAnnouncement = () => {
    executeGet({ url: apiUrls.courseAnnouncement + "/byCourse/" + courseid }).then((res) => {
      if (res && res.success && res.data && res.data?.length > 0) {
        setDataSource(res.data);
      }
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <NotificationsNoneOutlinedIcon style={{ fontSize: "30px", marginRight: 10 }} />
        Duyurular
      </Typography>

      <WrapperContainer>
        {dataSource.map((announcement, index) => (
          <AnnouncementCard
            key={index}
            xs={6}
            header={announcement?.header}
            description={announcement?.description}
            time={450}
            id={announcement?.id}
            announcementDate={announcement?.announcementDate}
            // onClick={(id) => detailClick(id)}
          />
        ))}
      </WrapperContainer>
    </div>
  );
};

export default CourseAnnouncement;
