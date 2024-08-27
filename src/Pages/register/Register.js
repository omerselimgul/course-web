import { IconButton } from "@mui/material";
import {
  IconInput,
  Button,
  BoxWrapper,
  Img,
  WrapperContainer,
} from "../../Base";
import marmaraLogo from "./marmara_logo.png";
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";

import { AuthCard, AuthWrapper } from "../../Components";
import FormBase from "../../Base/form-base/form-base";
import { useFormManager } from "../../Context/FormManagerContext";
import { UseApi } from "../../Context/Api/useApi";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import apiUrls from "../../Constant/apiurls/apiurls";
import Login from "../login/login";

const Register = () => {
  const { openDialog, setOpen } = useFormManager();
  const { executeAsync } = UseApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const emailRef = useRef();
  const loginClick = () => {
    openDialog({
      title: "Giriş Yap",
      content: <Login />,
      width: "sm",
    });
  };
  const saveClick = () => {
    const firstName = firstNameRef.current && firstNameRef.current.value;
    const lastName = lastNameRef.current && lastNameRef.current.value;
    const userName = userNameRef.current && userNameRef.current.value;
    const password = passwordRef.current && passwordRef.current.value;
    const email = emailRef.current && emailRef.current.value;
    const repeatPassword =
      repeatPasswordRef.current && repeatPasswordRef.current.value;

    if (repeatPassword !== password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    const payload = {
      firstName,
      lastName,
      userName,
      password,
      email,
      roles: ["student"],
    };
    executeAsync({
      url: apiUrls.Authentication,
      method: "POST",
      data: payload,
    }).then((res) => {
      if (res && res?.success) {
        // localStorage.setItem("user", JSON.stringify(res?.data));
        enqueueSnackbar("Başarıyla kayıt işleminiz gerçekleşti !!", {
          variant: "success",
        });
        setOpen(false);
        navigate("/");
      }
    });
  };

  const actionList = [
    {
      label: "Kayıt Ol",
      type: "validate",
      xs: "3",
      onClick: saveClick,
    },
  ];
  return (
    <FormBase actionList={actionList} className="LayoutInnerContainer">
      <WrapperContainer
        xs={12}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <BoxWrapper xs={12}>
          <Img
            src={"images/marmara-university.png"}
            height="130px"
            width="130px"
          />
        </BoxWrapper>

        <IconInput
          ref={firstNameRef}
          start
          xs={12}
          required
          label={"Ad"}
          icon={[{ Position: "start" }]}
          placeholder={"Ad Giriniz"}
        />
        <IconInput
          ref={lastNameRef}
          start
          required
          xs={12}
          label={"Soyad"}
          icon={[{ Position: "start" }]}
          placeholder={"Soyad Giriniz"}
        />
        <IconInput
          ref={userNameRef}
          start
          required
          xs={12}
          label={"Kullanıcı Adı"}
          icon={[{ Position: "start" }]}
          placeholder={"Kullacı Adı Giriniz"}
        />
        <IconInput
          ref={emailRef}
          start
          required
          xs={12}
          label={"Email"}
          icon={[{ Position: "start" }]}
          placeholder={"Email"}
          error={emailError}
          helperText={emailError && "mail adresini lütfen kontrol ediniz"}
        />
        <IconInput
          ref={passwordRef}
          start
          required
          xs={12}
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
        <IconInput
          error={passwordError}
          helperText={passwordError && "Şifreler aynı olmalıdır"}
          ref={repeatPasswordRef}
          start
          xs={12}
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
          placeholder={"Şifrenizi Tekrar Giriniz"}
        />
        <h5 xs={12}>
          <span style={{ fontSize: "0.95rem" }}>Zaten üye misin ? </span>
          <span
            onClick={() => loginClick()}
            style={{ color: "red", fontSize: "0.95rem" }}
          >
            Giriş Yap
          </span>
        </h5>
      </WrapperContainer>
    </FormBase>
  );
};

export default Register;
