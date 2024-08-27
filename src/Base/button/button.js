import MuiButton from "@mui/material/Button";
import { useAuth } from "../../Context/AuthContext";
import React, { useEffect, useMemo } from "react";
import { useFormManager } from "../../Context/FormManagerContext";
import Login from "../../Pages/login/login";
import LockIcon from "@mui/icons-material/Lock";
import { isNullOrUndefinedOrEmpty, userRolesValidation } from "../../Helper/helper";

const Button = ({ label, auth, isOnlyAdmin, onClick, userType, ...props }) => {
  const { user } = useAuth();
  const { openDialog } = useFormManager();

  const loginClick = () => {
    openDialog({
      title: "Giriş yap",
      content: <Login />,
      width: "sm",
    });
  };
  const clickAction = () => {
    if (!user && auth) {
      loginClick();
    } else if (onClick != undefined) {
      onClick();
    }
  };

  const userValidation = useMemo(() => {
    if (!isNullOrUndefinedOrEmpty(userType) && isNullOrUndefinedOrEmpty(user)) return false;

    if (isNullOrUndefinedOrEmpty(userType)) return true;
    if (userRolesValidation(userType)) return true;
    return false;
  }, [user, userType]);
  return (
    <>
      {userValidation && (
        <MuiButton
          {...props}
          style={{
            color: "black",
            fontFamily: "sans-serif",
            ...props.style,
          }}
          onClick={() => clickAction()}
        >
          {label || "Label"}
        </MuiButton>
      )}
    </>
  );
};

export default Button;
