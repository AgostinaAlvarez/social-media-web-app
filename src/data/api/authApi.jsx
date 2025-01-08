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
import {
  setConversationsInbox,
  setConversationsRequest,
  setLoadingConversationsInbox,
  setLoadingConversationsRequest,
} from "../../slice/conversationSlice";
import { setPosts } from "../../slice/postsSlice";
import { initializeStats } from "../../slice/statsSlice";
import { setUsernameNextModificationDate } from "../../slice/acountSettingsSlice";
import { HandleRequestFeedForYouPosts } from "../functions/feedFunctions";

const authToken = new AuthToken();

export const LogIn = async (dispatch, data, setLoading) => {
  try {
    console.log("Log In");
    const response = await axios.post(
      "http://localhost:8002/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, user, stats, profile_settings } = response.data;

    authToken.setToken("auth-token", token);

    dispatch(initializeStats(stats));
    dispatch(
      setUsernameNextModificationDate(profile_settings.nextModificationDate)
    );

    getDataConversations(dispatch, token);
    getMyPostsFunction(dispatch, token);
    ///Pedir data del feed
    HandleRequestFeedForYouPosts(dispatch);

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
    const { user, stats, profile_settings } = response.data;

    dispatch(initializeStats(stats));
    dispatch(
      setUsernameNextModificationDate(profile_settings.nextModificationDate)
    );

    getDataConversations(dispatch, token);
    getMyPostsFunction(dispatch, token);

    ///Pedir data del feed
    HandleRequestFeedForYouPosts(dispatch);

    HandleAllowAcces(dispatch, user, token);
  } catch (error) {
    HandleDennyAccess(dispatch);
  }
};

export const CreateNewUser = async (dispatch, data) => {
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

    const { token, user, stats, profile_settings } = response.data;
    authToken.setToken("auth-token", token);

    dispatch(initializeStats(stats));
    dispatch(
      setUsernameNextModificationDate(profile_settings.nextModificationDate)
    );

    dispatch(setConversationsRequest([]));
    dispatch(setConversationsInbox([]));
    dispatch(setLoadingConversationsRequest(false));
    dispatch(setLoadingConversationsInbox(false));
    dispatch(setPosts([]));

    return { data: { user, token }, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const SignUpUser = async (dispatch, user, token, setLoading) => {
  //esta funcion es para permitir el login
  //pedir data del feed
  HandleRequestFeedForYouPosts(dispatch);
  setTimeout(() => {
    dispatch(setLoading(true));
  }, 2500);
  setTimeout(() => {
    setLoading(false);
    HandleAllowAcces(dispatch, user, token);
  }, 2800);
};

/*
OLDEST CODE
*/

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
    const { token, user, stats } = response.data;
    authToken.setToken("auth-token", token);

    dispatch(initializeStats(stats));

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
