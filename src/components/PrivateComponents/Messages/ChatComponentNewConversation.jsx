import React, { useEffect, useState } from "react";
import { Avatar, Button, ConfigProvider, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { useTheme } from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getConverstionByUserId } from "../../../data/api/conversationApi";
import {
  addConversationToInbox,
  addConversationToRequest,
  addMessageToInbox,
  addMessageToRequest,
  addNewHour,
} from "../../../slice/conversationSlice";
import { sendMessage } from "../../../data/api/messageApi";
import { socket } from "../../../router/PrivateRoutes";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";
import { FaRegImage } from "react-icons/fa6";
import { MdInsertEmoticon } from "react-icons/md";
import { tranformDateToHour } from "../../../data/utils/dates";
import { TbSticker2 } from "react-icons/tb";

const ChatComponentNewConversation = ({ userData }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationData, setConversationData] = useState(null);

  const myUserData = useSelector((state) => state.userSlice.userData);

  /**
   * Socket catch
   */

  useEffect(() => {
    socket.on("private_message", (data) => {
      const { newMessage } = data;
      if (newMessage.sender === userData?._id) {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    });
  }, []);

  const HandleSendMessage = async () => {
    if (query.trim()) {
      //enviar el mensaje
      const data = {
        reciberId: userData?._id,
        message: query,
      };
      const { data: new_message_response, error } = await sendMessage(
        token,
        data
      );

      if (new_message_response) {
        if (messages.length === 0) {
          HandleSetNewConversation();
          HandleAddNewMessage(new_message_response.newMessage);
        } else {
          if (conversationData.type === "request") {
            dispatch(
              addMessageToRequest({
                conversationId: conversationData.id,
                newMessage: new_message_response.newMessage,
              })
            );
          } else if (conversationData.type === "message") {
            dispatch(
              addMessageToInbox({
                conversationId: conversationData.id,
                newMessage: new_message_response.newMessage,
              })
            );
          }
          HandleAddNewMessage(new_message_response.newMessage);
        }
      } else {
        console.log("error al enviar el mensaje");
        console.log(error);
      }
    }
  };

  const HandleSetNewConversation = async () => {
    //voy a buscar la conversacion por el userId,
    const { data: resonse_conversation, error } = await getConverstionByUserId(
      token,
      userData?._id
    );

    if (resonse_conversation) {
      const conversationType =
        resonse_conversation.conversation.conversation_type;

      setConversationData({
        type: conversationType,
        id: resonse_conversation.conversation._id,
      });
      if (conversationType === "request") {
        dispatch(addConversationToRequest(resonse_conversation));
      } else if (conversationType === "message") {
        dispatch(addConversationToInbox(resonse_conversation));
      }
    } else {
      console.log("error...");
      console.log(error);
    }
  };

  const HandleAddNewMessage = (newMessage) => {
    dispatch(addNewHour());
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setQuery("");
  };

  /*
  La escucha del mensaje va a ser en base al user Id porque la conversation esta rari
  */

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
            {userData?.name} {userData?.lastname}
          </span>
        </div>
      </div>
      <div className="chat-component-content">
        {messages.length === 0 ? (
          <div className="chat-defaul-bg ">
            {userData.avatar_img === "" || userData.avatar_img === undefined ? (
              <Avatar size={110} icon={<UserOutlined />} />
            ) : (
              <Avatar size={110} src={userData.avatar_img} />
            )}

            <span
              className="chat-defaul-bg-ttl info-name-lbl"
              style={{ marginTop: 7 }}
            >
              {userData.name} {userData.lastname}
            </span>
            <span
              className="info-username-lbl"
              style={{ fontSize: 15, marginBottom: 7 }}
            >
              @{userData.username}
            </span>
            <AntdSecondaryBtnComponent
              theme={theme}
              onClick={() => {
                navigate(`/user/${userData._id}`);
              }}
              label={"View Profile"}
            />
          </div>
        ) : (
          <>
            {messages.map((item) => (
              <>
                {myUserData._id === item.sender ? (
                  <>
                    <div className="chat-component-message-container chat-component-message-container-reciber">
                      <div className="chat-component-message chat-component-message-reciber">
                        {item.content}
                      </div>
                      <span className="chat-component-message-time-span chat-component-message-time-span-reciber">
                        {tranformDateToHour("2025-01-28T14:39:58.168Z")}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="chat-component-message-container chat-component-message-container-sender">
                    <div className="chat-component-message chat-component-message-sender">
                      {item.content}
                    </div>
                    <span className="chat-component-message-time-span chat-component-message-time-span-sender">
                      {tranformDateToHour("2025-01-28T14:39:58.168Z")}
                    </span>
                  </div>
                )}
              </>
            ))}
          </>
        )}
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
            fontSize: 20,
            color: "#4096ff",
          }}
        >
          <MdInsertEmoticon />
          <TbSticker2 />
          <FaRegImage />
        </div>

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
    Enviar
  </Button>
</ConfigProvider>

         */}
      </div>
    </div>
  );
};

export default ChatComponentNewConversation;
