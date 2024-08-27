import React, { useState } from "react";
import { UseApi } from "../../Context/Api/useApi";
import Navbar from "../../Components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import { userRolesValidation } from "../../Helper/helper";

const HomeLayout = ({ children, isAuth, allowedRoles, ...props }) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  if (allowedRoles != undefined) {
    const anyMatch = userRolesValidation(allowedRoles);
    if (anyMatch) {
      return (
        <div>
          <Navbar />

          {children}
        </div>
      );
    } else {
      return <div>Yetkisiz Sayfa</div>;
    }
  }
  if (isAuth && user) {
    return (
      <div>
        <Navbar />

        {children}
      </div>
    );
  } else if (isAuth && !user) {
    navigate("/login");
    // return <div>Yetkisiz Kullanıcı</div>;
  } else {
    return (
      <div>
        <Navbar />

        {children}
      </div>
    );
  }
};

export default HomeLayout;
