import MuiCard from "@mui/material/Card";
import CardHeader from "./card-header";
import CardContent from "./card-content";

const Card = ({ header, JustifyContent, AlignItems, title, ...rest }) => {
  const style = {
    alignItems: JustifyContent === true ? "center" : JustifyContent,
    justifyContent: AlignItems === true ? "center" : AlignItems,
    ...rest?.style,
  };

  const headerProps = {
    sx: { textAlign: "center" },
  };
  return (
    <MuiCard {...rest}>
      {header && <CardHeader title={title} sx={{ textAlign: "center" }} />}
      <CardContent {...rest} styles={style} />
    </MuiCard>
  );
};

export default Card;
