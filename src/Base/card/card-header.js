import MuiCardHeader from "@mui/material/CardHeader";

const CardHeader = ({ ...props }) => {
  const headerProps = {
    title: props.title,
    sx: props.sx,
  };
  return <MuiCardHeader {...headerProps} />;
};

export default CardHeader;
