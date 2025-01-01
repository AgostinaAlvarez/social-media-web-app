import axios from "axios";
import {
  setLoading,
  setLoadingLoginScreen,
  setLogged,
  setToken,
} from "../../slice/authSlice";
import { AuthToken } from "../local/authToken";
import { setUserData } from "../../slice/userSlice";
import {
  HandleAllowAcces,
  HandleDennyAccess,
} from "../functions/authFunctions";
import { getDataConversations } from "../functions/conversationsFunctions";
import { getMyPostsFunction } from "../functions/postsFunctions";

const authToken = new AuthToken();

export const LogIn = async (dispatch, data, setLoading) => {
  try {
    const response = await axios.post(
      "http://localhost:8002/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, user } = response.data;

    authToken.setToken("auth-token", token);

    getDataConversations(dispatch, token);
    getMyPostsFunction(dispatch, token);

    setTimeout(() => {
      dispatch(setLoading(true));
    }, 2500);
    setTimeout(() => {
      setLoading(false);
      HandleAllowAcces(dispatch, user, token);
    }, 2800);
  } catch (error) {
    HandleDennyAccess(dispatch);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
};

export const HandleVerifyToken = async (dispatch, token) => {
  //
  try {
    const response = await axios.get("http://localhost:8002/auth/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { user } = response.data;
    //pedir datos de las conversaciones
    getDataConversations(dispatch, token);
    getMyPostsFunction(dispatch, token);

    HandleAllowAcces(dispatch, user, token);
  } catch (error) {
    HandleDennyAccess(dispatch);
  }
};

export const SignupUser = async (dispatch, data, setLoading) => {
  try {
    const response = await axios.post(
      "http://localhost:8002/auth/signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, user } = response.data;
    authToken.setToken("auth-token", token);
    getDataConversations(dispatch, token);
    getMyPostsFunction(dispatch, token);

    setTimeout(() => {
      dispatch(setLoading(true));
    }, 2500);
    setTimeout(() => {
      setLoading(false);
      HandleAllowAcces(dispatch, user, token);
    }, 2800);
  } catch (error) {
    HandleDennyAccess(dispatch);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
};

/*

{
  headers: {
    "Content-Type": "application/json",
  },
}
{
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  },
}
*/
