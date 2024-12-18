import axios from "axios";
import { setLoading, setLogged, setToken } from "../../slice/authSlice";
import { AuthToken } from "../local/authToken";
import { setUserData } from "../../slice/userSlice";
import {
  HandleAllowAcces,
  HandleDennyAccess,
} from "../functions/authFunctions";
import { getDataConversations } from "../functions/conversationsFunctions";

const authToken = new AuthToken();

export const LogIn = async (dispatch, data) => {
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

    //pedir datos de las conversaciones
    getDataConversations(dispatch, token);
    //ultimas cosas
    setTimeout(() => {
      dispatch(setLoading(true));
    }, 1500);
    setTimeout(() => {
      HandleAllowAcces(dispatch, user, token);
    }, 1800);
  } catch (error) {
    HandleDennyAccess(dispatch);
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
    HandleAllowAcces(dispatch, user, token);
  } catch (error) {
    HandleDennyAccess(dispatch);
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
