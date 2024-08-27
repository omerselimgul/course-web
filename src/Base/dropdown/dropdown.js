import React from "react";
import "./dropdown.css";
import { Button } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import { UserRoles, userRolesValidation } from "../../Helper/helper";

const DropDown = () => {
  const { user } = useAuth();

  return (
    <div style={{ position: "relative" }}>
      <div className="dropdown-header">
        <button id="navbar-button" className="dropdown-title">
          Hesabım
        </button>
      </div>
      <div className="dropdown text-center">
        <ul className="dropdown-menu dropdown-menu-center">
          {userRolesValidation([UserRoles.Admin]) && (
            <>
              <li>
                <a className="linkto" href="/applications">
                  Tüm Başvurular
                </a>
              </li>
            </>
          )}

          <li>
            <a className="linkto" href="/profile">
              Profilim
            </a>
          </li>
          {userRolesValidation([UserRoles.Admin]) && (
            <li>
              <a className="linkto" href="/all-announce">
                Genel Duyurular
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
