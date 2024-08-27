import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_TOKEN,
} from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  token: null, // Yeni eklenen token alanı
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
