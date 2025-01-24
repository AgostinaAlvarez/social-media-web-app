import React, { useEffect, useState } from "react";
import UserItem from "../User/UserItem";
import { Avatar, Button, ConfigProvider, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTheme } from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { socket } from "../../../router/PrivateRoutes";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../../data/api/messageApi";
import {
  addMessageToInbox,
  addMessageToRequest,
} from "../../../slice/conversationSlice";

import { FaRegImage } from "react-icons/fa6";
import { MdInsertEmoticon } from "react-icons/md";

const ChatComponent = ({ conversation }) => {
  const token = useSelector((state) => state.authSlice.token);
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const myUserData = useSelector((state) => state.userSlice.userData);
  const userData = conversation?.conversation.user;
  const messagesData = conversation?.messages.messages;

  const [messages, setMessages] = useState(messagesData);

  useEffect(() => {
    socket.on("private_message", (data) => {
      const { newMessage } = data;
      if (newMessage.conversationId === conversation?.conversation._id) {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    });
  }, []);

  const HandleSendMessage = async () => {
    if (query.trim()) {
      const data = {
        reciberId: userData?._id,
        message: query,
      };

      const { data: new_message_response, error } = await sendMessage(
        token,
        data
      );

      const conversationData = conversation?.conversation;

      if (conversationData.conversation_type === "request") {
        dispatch(
          addMessageToRequest({
            conversationId: conversationData._id,
            newMessage: new_message_response.newMessage,
          })
        );
      } else if (conversationData.conversation_type === "message") {
        dispatch(
          addMessageToInbox({
            conversationId: conversationData._id,
            newMessage: new_message_response.newMessage,
          })
        );
      }

      HandleAddNewMessage(new_message_response.newMessage);
    }
  };

  const HandleAddNewMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setQuery("");
  };

  return (
    <div className="chat-component-container">
      <div className="chat-component-header">
        {userData.avatar_img === "" || userData.avatar_img === undefined ? (
          <Avatar size={47} icon={<UserOutlined />} />
        ) : (
          <Avatar size={47} src={userData.avatar_img} />
        )}

        <div className="chat-component-header-user-info">
          <span>
            {userData.name} {userData.lastname}
          </span>
        </div>
      </div>
      <div className="chat-component-content">
        {/**Mensajes */}
        {messages.map((item) => (
          <>
            {myUserData._id === item.sender ? (
              <div className="chat-component-message-container chat-component-message-container-reciber">
                <div className="chat-component-message chat-component-message-reciber">
                  {item.content}
                </div>
              </div>
            ) : (
              <div className="chat-component-message-container chat-component-message-container-sender">
                <div className="chat-component-message chat-component-message-sender">
                  {item.content}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="chat-component-input-container">
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder:
                theme === "dark" ? "rgb(189, 189, 189)" : "rgb(99, 99, 99)",
              colorBgContainer:
                theme === "dark" ? "#282828" : "rgba(239,239,239,255)",
            },
          }}
        >
          <Input
            style={{
              border: "none",
              boxShadow: "none",
              color: theme === "dark" ? "white" : "black",
              //padding: "0px 10px",
              height: 40,
            }}
            //placeholder="Para..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ConfigProvider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            gap: 8,
            fontSize: 20,
            color: "#4096ff",
          }}
        >
          <MdInsertEmoticon />
          <FaRegImage />
          {/*
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    borderColorDisabled: theme === "dark" ? "#244a6d" : "#bfe0fc",
                  },
                },
                token: {
                  colorBgContainerDisabled:
                    theme === "dark" ? "#244a6d" : "#bfe0fc",
                  colorTextDisabled: theme === "dark" ? "#4b5e6f" : "#e0f0fe",
                },
              }}
            >
              <Button
                loading={loading ? true : false}
                onClick={() => {
                  HandleSendMessage();
                }}
                type="primary"
                disabled={query.trim() === "" ? true : false}
                style={{
                  height: 40,
                  width: 100,
                }}
              >
                Send
              </Button>
            </ConfigProvider>
            
            */}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
