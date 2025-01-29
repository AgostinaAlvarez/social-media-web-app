import React, { useEffect, useState } from "react";
import UserItem from "../User/UserItem";
import { Avatar, Button, ConfigProvider, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTheme } from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { socket } from "../../../router/PrivateRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { sendMessage } from "../../../data/api/messageApi";
import {
  addMessageToInbox,
  addMessageToRequest,
  addNewHour,
} from "../../../slice/conversationSlice";
import { IoMdLink } from "react-icons/io";

import { FaRegImage } from "react-icons/fa6";
import { MdInsertEmoticon } from "react-icons/md";
import { tranformDateToHour } from "../../../data/utils/dates";
import { LuLink } from "react-icons/lu";
import { RiEmojiStickerLine } from "react-icons/ri";

import okSticker from "../../../assets/okey.png";
import corazonSticker from "../../../assets/corazon.png";

import { LuSticker } from "react-icons/lu";
import { TbSticker2 } from "react-icons/tb";

const ChatComponent = ({ conversation }) => {
  const token = useSelector((state) => state.authSlice.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(addNewHour());
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setQuery("");
  };

  return (
    <div className="chat-component-container">
      <div
        className="chat-component-header"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/user/${userData._id}`);
        }}
      >
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
        {messages.map((item) => (
          <>
            {myUserData._id === item.sender ? (
              <>
                <div className="chat-component-message-container chat-component-message-container-reciber">
                  {item._id === "67980083df283a734fed534f" ? (
                    <img className="message-sticker" src={okSticker} />
                  ) : (
                    <></>
                  )}
                  <div className="chat-component-message chat-component-message-reciber">
                    {item.content}
                  </div>

                  <span className="chat-component-message-time-span chat-component-message-time-span-reciber">
                    {tranformDateToHour(item.createdAt)}
                  </span>
                </div>
              </>
            ) : (
              <div className="chat-component-message-container chat-component-message-container-sender">
                <div className="chat-component-message chat-component-message-sender">
                  {item.content}
                </div>
                {item._id === "679800c7df283a734fed5379" ? (
                  <div className="message-link-preview-container">
                    <img
                      style={{ borderRadius: "10px" }}
                      src="https://crimejunkiepodcast.com/wp-content/uploads/2020/12/Crime-Junkie-Podcast-feature.png"
                      className="message-link-preview-image-container"
                    />
                    <div className="message-link-preview-data-container">
                      <span>Crime Junkie Podcast</span>
                      <p className="message-link-preview-description-p">
                        Ashley Flowers is the Founder and CFO of audiochuck. A
                        media and podcast production company known for its
                        standout content and storytelling.
                      </p>
                      <div className="message-link-preview-url-container">
                        <LuLink />
                        <span>https://crimejunkiepodcast.com/</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {item._id === "679800b2df283a734fed536d" ? (
                  <>
                    <div className="chat-component-message chat-component-message-sender">
                      They are my favorites
                    </div>
                    <img
                      className="message-sticker-like"
                      src={corazonSticker}
                    />
                  </>
                ) : (
                  <></>
                )}

                <span className="chat-component-message-time-span chat-component-message-time-span-sender">
                  {tranformDateToHour(item.createdAt)}
                </span>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="chat-component-input-container">
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: theme === "dark" ? "#727272ea" : "#929292",
              colorBgContainer:
                theme === "dark"
                  ? "rgba(54,54,54,255)"
                  : "rgba(239,239,239,255)",
            },
          }}
        >
          <Input
            style={{
              border: "none",
              boxShadow: "none",
              color: theme === "dark" ? "white" : "black",
              height: 40,
            }}
            placeholder="Write a message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={() => {
              HandleSendMessage();
            }}
          />
        </ConfigProvider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            gap: 8,
            fontSize: 21,
            color: "#4096ff",
            cursor: "pointer",
          }}
        >
          <MdInsertEmoticon />
          <TbSticker2 />
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
