import React from "react";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import DropDown from "../../Base/dropdown/dropdown";
import { useAuth } from "../../Context/AuthContext";
import { useFormManager } from "../../Context/FormManagerContext";
import Login from "../../Pages/login/login";
const Navbar = () => {
  const { openDialog } = useFormManager();
  const { user } = useAuth();
  const navigate = useNavigate();

  const loginClick = () => {
    openDialog({
      title: "Giriş yap",
      content: <Login />,
      width: "sm",
    });
  };

  const logoutClicked = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <a href="/">
        <img src="images/marmara-university.png" alt="" width={"90px"} />
      </a>
      {user && (
        <div className="navbar-user">
          {user?.firstName} {user?.lastName}
        </div>
      )}

      <div id="navbar-right">
        <a style={{ textDecoration: "none" }} href="/all-courses">
          <div>Kurslar</div>
        </a>
        <a style={{ textDecoration: "none" }} href="/teachers">
          <div>Eğitmenler</div>
        </a>
        {user ? (
          <React.Fragment>
            <DropDown />
            <button id="navbar-button" onClick={() => logoutClicked()}>
              Çıkış Yap
            </button>
          </React.Fragment>
        ) : (
          <button id="navbar-button" onClick={() => loginClick()}>
            Giriş Yap
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
