import * as actionTypes from "./actionTypes";

export function loginSuccess(userData) {
  return { type: actionTypes.LOGIN_SUCCESS, payload: userData };
}

export function loginFailure(userError) {
  return { type: actionTypes.LOGIN_FAILURE, payload: userError };
}

// Token'ı Redux state'e ekleyen yeni bir action
export function setToken(token) {
  return { type: actionTypes.SET_TOKEN, payload: token };
}

export function loginApi(userName, password) {
  return (dispatch) => {
    const url = "https://localhost:7102/api/authentication/login";

    console.log("API İstek Yapılıyor:", url);

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((result) => {
        localStorage.setItem({ user: result?.token });
        // Login başarılı olduğunda hem kullanıcı bilgilerini hem de token'ı Redux state'e ekleyin
        dispatch(loginSuccess(result));
        dispatch(setToken(result.token)); // Burada token'ı ekliyorum, gerçek duruma göre uyarlayabilirsiniz
        console.log(result.token);
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        console.error("Fetch error:", error);
      });
  };
}
