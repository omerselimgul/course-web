import { IconButton } from "@mui/material";
import { IconInput, BoxWrapper, Img, WrapperContainer } from "../../Base";
import {
  AccountCircle,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { UseApi } from "../../Context/Api/useApi";

import FormBase from "../../Base/form-base/form-base";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";
import { useFormManager } from "../../Context/FormManagerContext";
import { useNavigate } from "react-router-dom";
import Register from "../register/Register";
import imgurl from "./marmara-university.png";

const Login = () => {
  const { openDialog, setOpen } = useFormManager();
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const userNameRef = useRef();
  const passwordRef = useRef();

  const saveClick = () => {
    const payload = {
      userName: userNameRef.current && userNameRef.current.value,
      password: passwordRef.current && passwordRef.current.value,
    };

    executeAsync({
      url: apiUrls.Authentication + "/login",
      method: "POST",
      data: payload,
    }).then((res) => {
      if (res && res?.success && res?.data) {
        localStorage.setItem("user", JSON.stringify(res?.data));
        enqueueSnackbar("Başarıyla giriş yapıldı", {
          variant: "success",
        });
        setOpen(false);
        navigate("/");
      }
    });
  };

  const registerClick = () => {
    openDialog({
      title: "Kayıt Ol",
      content: <Register />,
      width: "sm",
    });
  };
  const actionList = [
    {
      label: "GİRİŞ YAP",
      type: "validate",
      xs: "3",
      onClick: saveClick,
    },
  ];
  return (
    <FormBase actionList={actionList} className="LayoutInnerContainer">
      <WrapperContainer
        xs={12}
        justifyContent={"center"}
        gap={3}
        alignItems={"center"}
      >
        <BoxWrapper xs={12}>
          <Img xs={12} src={imgurl} height="200px" width="200px" />
        </BoxWrapper>

        <IconInput
          ref={userNameRef}
          start
          required
          xs={12}
          label={"Kullanıcı Adı"}
          icon={[{ Position: "start", Icon: <AccountCircle /> }]}
          placeholder={"Kullanıcı Adı Giriniz"}
        />
        <IconInput
          ref={passwordRef}
          xs={12}
          start
          required
          label={"Şifre"}
          type={showPassword ? "text" : "password"}
          icon={[
            { Position: "start", Icon: <Key /> },
            {
              Position: "end",
              Icon: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          ]}
          placeholder={"Şifre Giriniz"}
        />
        <h5 xs={12}>
          <span
            style={{ fontSize: "0.95rem" }}>
            Hesabınız yok mu?{" "}
          </span>
          <span
            onClick={() => registerClick()}
            style={{ color: "red", fontSize: "0.95rem" }}
          >
            Hesap oluştur
          </span>
        </h5>
      </WrapperContainer>
    </FormBase>
  );
};

export default Login;
