import { Typography } from "@mui/material";
import BaseText from "../../Base/base-text/base-text";

const CourseDescription = ({ source, ...props }) => {
  return (
    <div>
      <BaseText header={"Eğitimin Amacı"} content={source?.purposeOfCourse} />
      <BaseText header={"Eğitimin Tanımı"} content={source?.description} />
    </div>
  );
};

export default CourseDescription;
