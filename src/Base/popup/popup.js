import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormManager } from "../../Context/FormManagerContext";

export default function Popup({
  width,
  open,
  setOpen,
  title,
  content,
  fullScreen,
  position,
  ...props
}) {
  //   const { openDialog, setOpenDialog } = useFormManager();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={width}
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      {...(position ? { sx: { left: "65%", minWidth: "300px" } } : {})}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
