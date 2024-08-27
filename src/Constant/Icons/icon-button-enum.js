import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import QuestionMark from "@mui/icons-material/QuestionMark";

const IconTypes = {
  Visibility: { type: Visibility },
  visibilityOff: { type: VisibilityOff },
};

export const GetIcon = (props) => {
  let IconType = QuestionMark;
  if (props && props.icon && IconTypes[props.icon]) {
    IconType = IconTypes[props.icon].type;
  }
  return <IconType {...props} />;
};
