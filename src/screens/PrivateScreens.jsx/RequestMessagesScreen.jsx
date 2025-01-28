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
import { FaRegEdit } from "react-icons/fa";

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  boxSizing: "border-box",
                }}
              >
                {userData.avatar_img === "" ||
                userData.avatar_img === undefined ? (
                  <Avatar size={42} icon={<UserOutlined />} />
                ) : (
                  <Avatar size={42} src={userData.avatar_img} />
                )}
                <span>{userData.username} </span>
              </div>
              <FaRegEdit
                style={{ cursor: "pointer" }}
                onClick={() => {
                  //showModal();
                }}
              />
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
                Inbox
              </span>
              <span
                className="messages-aside-header-nav-item-cta"
                style={{ cursor: "pointer" }}
              >
                Requests
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
                      Message requests
                    </span>
                    <div className="search-component-empty-container">
                      <span>No requests</span>
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
                Message requests
              </span>
              <span className="conversation-default-screen-subttl">
                These messages are from people you've restricted or don't
                follow. They won't know you've seen their request until you
                allow them to send you messages.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestMessagesScreen;
