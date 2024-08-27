import axios from "axios";
import authReducer from "../../redux/reducers/authReducer";
import { useAuth } from "../AuthContext";
import { enqueueSnackbar } from "notistack";
import { useLoadingSpinner } from "../LoadingSpinnerContext";

const localPort = 7102;
export const UseApi = () => {
  const { openSpinner, closeSpinner } = useLoadingSpinner();
  const { user } = useAuth();

  const executeGet = async ({ url, data, headers, ...options }) => {
    return await executeAsync({
      url,
      data,
      headers,
      ...options,
      method: "GET",
    });
  };
  const executeAsync = async ({ url, data, method, headers, ...options }) => {
    const requestObject = {
      method: method || "GET",
      headers: headers,
      url: url,
      params: options.params,
      data,
    };
    if (!String(requestObject.url).includes("api")) {
      axios.defaults.baseURL = `https://localhost:${localPort}/api/`;
    }
    if (user && user.accessToken)
      requestObject.headers = {
        ...headers,
        Authorization: `Bearer ${user.accessToken}`,
      };
    // {
    // } else {
    //   // logout section
    //   //   defaultSnackbar.enqueueSnackbar(
    //   //     ("Session not found. Logging out..."),
    //   //     {
    //   //       showClose: true,
    //   //       autoHideDuration: 5000,
    //   //       onClose: () => {
    //   //         // handleLogout && handleLogout();
    //   //       },
    //   //     }
    //   //   );,
    //   return Promise.reject({
    //     Success: false,
    //   });
    // }
    // const requestParam = requestObject.params
    //   ? JSON.stringify(requestObject.params)
    //   : "";
    // const requestData = requestObject.data
    //   ? JSON.stringify(requestObject.data)
    //   : "";

    const onRequestStart = (config) => {
      if (options?.spinner) openSpinner();
      return config;
    };
    axios.interceptors.request.use(onRequestStart);

    // axios.post("","",{onUploadProgress})
    return await axios
      .request(requestObject)
      .then((response) => {
        if (response && response?.data && response?.data?.success === false) {
          enqueueSnackbar(response?.data?.message || "Bir hata oluştu", {
            variant: "error",
          });
          return response.data;
        }
        if (response && response?.data) {
          return response.data;
        }
      })
      .catch((error) => {
        if (error?.response?.data?.Message) {
          enqueueSnackbar(error?.response?.data?.Message, { variant: "error" });
          return { success: false, error };
        }
        enqueueSnackbar(error?.message, { variant: "error" });
        return { success: false, error };
      })
      .finally(() => {
        closeSpinner();
      });
  };

  return {
    executeAsync,
    executeGet,
  };
};
