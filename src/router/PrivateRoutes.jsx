import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import HomeScreen from "../screens/PrivateScreens.jsx/HomeScreen";
import LayoutPrivate from "../structure/LayoutPrivate";
import LayoutMessages from "../structure/LayoutMessages";
import MessagesScreen from "../screens/PrivateScreens.jsx/MessagesScreen";
import RequestMessagesScreen from "../screens/PrivateScreens.jsx/RequestMessagesScreen";
import { UserOutlined } from "@ant-design/icons";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversationToInbox,
  addConversationToRequest,
  addMessageToInbox,
  addMessageToRequest,
} from "../slice/conversationSlice";
import { ConfigProvider, notification } from "antd";
import { useTheme } from "../context/ThemeContext";
import { store } from "../store/store";
import UserScreen from "../screens/PrivateScreens.jsx/UserScreen";
import { getConverstionByUserId } from "../data/api/conversationApi";
import ProfileScreen from "../screens/PrivateScreens.jsx/ProfileScreen";
import EditProfileScreen from "../screens/PrivateScreens.jsx/Profile/EditProfileScreen";
import PostScreen from "../screens/PrivateScreens.jsx/Post/PostScreen";
import MyCommentsScreen from "../screens/PrivateScreens.jsx/Profile/MyCommentsScreen";
import MyLikesScreen from "../screens/PrivateScreens.jsx/Profile/MyLikesScreen";
import MySavedScreen from "../screens/PrivateScreens.jsx/Profile/MySavedScreen";
import TesterScreen from "../screens/TesterScreen";
export const socket = io("http://localhost:8002");

const PrivateRoutes = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.authSlice.token);

  const [api, contextHolder] = notification.useNotification();
  const { theme } = useTheme();

  useEffect(() => {
    socket.emit("authenticate", userData._id);

    socket.on("private_message", (data) => {
      console.log(data);
      const { conversationType, newConversation } = data;
      HandleMessageNotification(data);
      if (newConversation === true) {
        HandleAddNewConversation(data.sender._id);
      } else {
        //ya existe la conversacion, asique voy a agregar su nuevo mensaje
        if (conversationType === "request") {
          dispatch(
            addMessageToRequest({
              conversationId: data.newMessage.conversationId,
              newMessage: data.newMessage,
            })
          );
        } else if (conversationType === "message") {
          dispatch(
            addMessageToInbox({
              conversationId: data.newMessage.conversationId,
              newMessage: data.newMessage,
            })
          );
        }
      }
    });

    return () => {
      socket.off("private_message");
    };
  }, []);

  const HandleMessageNotification = (data) => {
    const selectedConversation =
      store.getState().messageSlice.selectedConversationSlice;
    if (!selectedConversation) {
      messageNotification();
    } else {
      if (
        selectedConversation.conversation._id !== data.newMessage.conversationId
      ) {
        messageNotification();
      }
    }
  };

  const HandleAddNewConversation = async (senderId) => {
    const { data: response, error } = await getConverstionByUserId(
      token,
      senderId
    );
    if (response) {
      const conversationType = response.conversation.conversation_type;
      if (conversationType === "request") {
        dispatch(addConversationToRequest(response));
      } else if (conversationType === "message") {
        dispatch(addConversationToInbox(response));
      }
    } else {
      console.log("error");
      console.log(error);
    }
  };

  const messageNotification = () => {
    api.open({
      icon: <UserOutlined />,
      message: "Sender",
      description: "mensaje",
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme === "dark" ? "#262626" : "#ffffff",
          colorText: theme === "dark" ? "#ffffff" : "#000000",
        },
      }}
    >
      {contextHolder}
      <Routes>
        <Route
          path="/"
          element={
            <LayoutPrivate>
              <HomeScreen />
            </LayoutPrivate>
          }
        />
        <Route path="/test" element={<TesterScreen />} />
        <Route
          path="/profile"
          element={
            <LayoutPrivate>
              <ProfileScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/profile/comments"
          element={
            <LayoutPrivate>
              <MyCommentsScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/profile/likes"
          element={
            <LayoutPrivate>
              <MyLikesScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/profile/saved"
          element={
            <LayoutPrivate>
              <MySavedScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/edit-profile/*"
          element={
            <LayoutPrivate>
              <EditProfileScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/messages/inbox/*"
          element={
            <LayoutMessages>
              <MessagesScreen />
            </LayoutMessages>
          }
        />
        <Route
          path="/messages/requests"
          element={
            <LayoutMessages>
              <RequestMessagesScreen />
            </LayoutMessages>
          }
        />
        <Route
          path="/post/*"
          element={
            <LayoutPrivate>
              <PostScreen />
            </LayoutPrivate>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <LayoutPrivate>
              <UserScreen key={window.location.pathname} />
            </LayoutPrivate>
          }
        />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
};

export default PrivateRoutes;
