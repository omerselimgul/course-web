import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";

const HworkValidator = ({ children, ...props }) => {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  const { courseid } = useParams();
  const navigate = useNavigate();
  const { executeGet } = UseApi();
  const [isValidate, setValidate] = useState(false);

  const findValidate = useCallback(async () => {
    executeGet({ url: apiUrls.Courses + "/Coursestudentcontrol?userId=" + userJson.userId + "&courseid=" + courseid }).then((res) => {
      if (res.success) setValidate(true);
      else navigate("/*");
    });
  }, [userJson.userId, courseid]);

  useEffect(() => {
    findValidate();
  }, []);

  return <>{isValidate && children}</>;
};

export default HworkValidator;
