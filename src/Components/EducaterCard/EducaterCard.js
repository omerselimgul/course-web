import { Typography } from "@mui/material";
import Avesis from "./avesis.png";
import { WrapperContainer } from "../../Base";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./EducaterCard.css";
const EducaterCard = ({ link, image, index, onCloseClick, title, content, ...props }) => {
  return (
    <div className="educater-card-container">
      <div className="educater-card">
        <CloseOutlinedIcon onClick={onCloseClick} className="educater-close" />
        <div className={"educater-header"}>
          <img className={"educater-image"} alt={`Kart Resmi ${index}`} src="/images/educator_avatar.jpg" width="100%" height="100%" />
        </div>

        <div className="course-content">
          <Typography
            style={{
              fontSize: "1.2rem",
              width: "99%",
              lineHeight: "1.1", // Adjust this value as needed
            }}
          >
            {title}
          </Typography>

          <a href={link} target="_blank">
            <img className={"educater-image"} alt={`Kart Resmi ${index}`} src={Avesis} width="55px" height="30px" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EducaterCard;
