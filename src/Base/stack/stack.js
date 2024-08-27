import MuiStack from "@mui/material/Stack";

const Stack = ({ children }) => {
  return (
    <MuiStack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {children}
    </MuiStack>
  );
};

export default Stack;
