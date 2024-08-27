import React, { createContext, useContext, useState } from "react";
import Popup from "../Base/popup/popup";

const FormManagerContext = createContext();

// width :  sm || md  || lg
// content:  children
//Title : "Header"
const FormManagerContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const openDialog = (params) => {
    setOpen(true);
    setDialogData({
      ...params,
      callback: (data) => {
        setOpen(false);
        params?.callback && params.callback(data);
      },
    });
  };

  const values = {
    openDialog,
    setOpen,
  };

  return (
    <FormManagerContext.Provider value={values}>
      <Popup
        title={dialogData?.title || "Hellooooüüüü"}
        content={
          (dialogData?.content &&
            React.cloneElement(dialogData?.content, {
              close: dialogData?.callback,
            })) || <div>asdasd</div>
        }
        width={dialogData?.width || "md"}
        open={open}
        fullScreen={dialogData?.fullScreen || false}
        position={dialogData?.position}
        setOpen={setOpen}
      />
      {children}
    </FormManagerContext.Provider>
  );
};
const useFormManager = () => {
  const context = useContext(FormManagerContext);
  return context;
};
export { useFormManager };
export default FormManagerContextProvider;
