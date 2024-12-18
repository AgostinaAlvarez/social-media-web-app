import { Avatar, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LuMessageCirclePlus } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import UserConversationItem from "../../components/PrivateComponents/User/UserConversationItem";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { getConversations } from "../../data/api/conversationApi";
import { setLoading } from "../../slice/authSlice";
import ChatComponent from "../../components/PrivateComponents/Messages/ChatComponent";
import { setSelectedConversationSlice } from "../../slice/messageSlice";

const RequestMessagesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //slices data
  const loadingConversationsRequest = useSelector(
    (state) => state.conversationSlice.loadingConversationsRequest
  );
  const conversationsRequest = useSelector(
    (state) => state.conversationSlice.conversationsRequest
  );

  const userData = useSelector((state) => state.userSlice.userData);
  const token = useSelector((state) => state.authSlice.token);

  //conversations rendered
  const [selectedConversation, setSelectedConversation] = useState(null);

  const selectConversation = (conversationData) => {
    console.log("conversation data");
    console.log(conversationData);
    dispatch(setSelectedConversationSlice(conversationData));
    setSelectedConversation(conversationData);
  };

  return (
    <>
      <div className="messages-screen-container">
        <div className="messages-aside">
          <div className="messages-aside-header">
            <div className="messages-aside-header-name">
              <Avatar size={30} icon={<UserOutlined />} />
              <span>{userData.username} </span>
            </div>
            <div className="messages-aside-header-nav">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log(
                    "seteando conversacion a nula desde REQUEST MESSAGE SCREEN"
                  );
                  dispatch(setSelectedConversationSlice(null));
                  navigate("/messages/inbox");
                }}
              >
                Principal
              </span>
              <span
                className="messages-aside-header-nav-item-cta"
                style={{ cursor: "pointer" }}
              >
                Solicitudes
              </span>
            </div>
          </div>
          <div className="messages-aside-conversations-container">
            {loadingConversationsRequest ? (
              <div className="message-aside-spiner-container">
                <Spin size="large" indicator={<LoadingOutlined spin />} />
              </div>
            ) : (
              <>
                {conversationsRequest.length === 0 ? (
                  <>
                    <span className="messages-aside-empty-ttl ">
                      Solicitudes de mensajes
                    </span>
                    <div className="search-component-empty-container">
                      <span>No hay solicitudes.</span>
                    </div>
                  </>
                ) : (
                  <>
                    {conversationsRequest.map((item) => (
                      <>
                        <UserConversationItem
                          conversation={item}
                          selectConversation={selectConversation}
                        />
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="messages-chat-container">
          {selectedConversation ? (
            <ChatComponent conversation={selectedConversation} />
          ) : (
            <div className="conversation-default-screen">
              <Avatar size={110} icon={<FaUserPlus />} />
              <span className="conversation-default-screen-ttl">
                Solicitudes de mensajes
              </span>
              <span className="conversation-default-screen-subttl">
                Estos mensajes son de personas que has restringido o a las que
                no sigues. No sabrán que has visto su solicitud hasta que les
                permitas enviarte mensajes.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestMessagesScreen;
