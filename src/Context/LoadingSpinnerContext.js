import { createContext, useContext, useState } from "react";
import Popup from "../Base/popup/popup";
import Spinner from "../Base/spinner/spinner";

const LoadingSpinnerContext = createContext();

// width :  sm || md  || lg
// content:  children
//Title : "Header"
const LoadingSpinnerContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openSpinner = () => {
    setOpen(true);
  };
  const closeSpinner = () => {
    setOpen(false);
  };
  const values = {
    openSpinner,
    closeSpinner,
    setOpen,
  };

  return (
    <LoadingSpinnerContext.Provider value={values}>
      {open && <Spinner open={open} />}
      {children}
    </LoadingSpinnerContext.Provider>
  );
};
const useLoadingSpinner = () => {
  const context = useContext(LoadingSpinnerContext);
  return context;
};
export { useLoadingSpinner };
export default LoadingSpinnerContextProvider;
