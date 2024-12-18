import { setLoading, setLogged, setToken } from "../../slice/authSlice";
import { setUserData } from "../../slice/userSlice";
import { HandleVerifyToken } from "../api/authApi";
import { AuthToken } from "../local/authToken";

const authToken = new AuthToken();

export const HandleVerifyAccess = async (dispatch) => {
  const token = authToken.getToken("auth-token");
  if (!token) {
    HandleDennyAccess(dispatch);
    return;
  }
  HandleVerifyToken(dispatch, token);
};

export const HandleDennyAccess = (dispatch) => {
  dispatch(setLogged(false));
  setTimeout(() => {
    dispatch(setLoading(false));
  }, 1000);
};

export const HandleAllowAcces = (dispatch, userData, token) => {
  dispatch(setUserData(userData));
  dispatch(setToken(token));
  dispatch(setLogged(true));
  setTimeout(() => {
    dispatch(setLoading(false));
  }, 1000);
};
