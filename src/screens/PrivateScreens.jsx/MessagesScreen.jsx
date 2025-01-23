import React, { useEffect, useState } from "react";
import UserConversationItem from "../../components/PrivateComponents/User/UserConversationItem";
import { MessageOutlined } from "@ant-design/icons";
import { LuMessageCirclePlus } from "react-icons/lu";
import { Avatar, Button, ConfigProvider, Modal, Spin } from "antd";
import NewMessageModal from "../../components/PrivateComponents/Messages/NewMessageModal";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { getConversations } from "../../data/api/conversationApi";
import { setSelectedConversationSlice } from "../../slice/messageSlice";
import { store } from "../../store/store";
import RenderChatScreen from "../../components/PrivateComponents/Messages/RenderChatScreen";

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //slices data
  const loadingConversationsInbox = useSelector(
    (state) => state.conversationSlice.loadingConversationsInbox
  );
  const conversationsInbox = useSelector(
    (state) => state.conversationSlice.conversationsInbox
  );
  const userData = useSelector((state) => state.userSlice.userData);
  const token = useSelector((state) => state.authSlice.token);

  //conversations rendered
  const [conversations, setConversations] = useState(conversationsInbox);
  const [selectedConversation, setSelectedConversation] = useState(null);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSelectConversationModal, setLoadingSelectConversationModal] =
    useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (userData, resetData) => {
    setLoadingSelectConversationModal(true);
    console.log("usuario con el que voy a renderizar la conversacion");
    console.log(userData);
    setTimeout(() => {
      resetData();
      setIsModalOpen(false);
    }, 2000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const HandleSelectConversation = (conversation) => {
    //navigate to conversation._id

    navigate(`/messages/inbox/${conversation.conversation.user._id}`);
  };

  return (
    <>
      <div className="messages-screen-container">
        <div className="messages-aside">
          <div className="messages-aside-header">
            <div className="messages-aside-header-name">
              {userData.avatar_img === "" ||
              userData.avatar_img === undefined ? (
                <Avatar size={35} icon={<UserOutlined />} />
              ) : (
                <Avatar size={35} src={userData.avatar_img} />
              )}
              <span>{userData.username} </span>
            </div>
            <div className="messages-aside-header-nav">
              <span
                style={{ cursor: "pointer" }}
                className="messages-aside-header-nav-item-cta"
              >
                Principal
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log(
                    "seteando conversacion a nula desde MESSAGE SCREEN"
                  );
                  dispatch(setSelectedConversationSlice(null));
                  navigate("/messages/requests");
                }}
              >
                Solicitudes
              </span>
            </div>
          </div>
          <div className="messages-aside-conversations-container">
            {loadingConversationsInbox ? (
              <div className="message-aside-spiner-container">
                <Spin size="large" indicator={<LoadingOutlined spin />} />
              </div>
            ) : (
              <>
                {conversationsInbox.length === 0 ? (
                  <>
                    <span className="messages-aside-empty-ttl ">
                      Conversaciones
                    </span>
                    <div className="search-component-empty-container">
                      <span>No hay conversaciones.</span>
                    </div>
                  </>
                ) : (
                  <>
                    {conversationsInbox.map((item) => (
                      <UserConversationItem
                        conversation={item}
                        selectConversation={HandleSelectConversation}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="messages-chat-container">
          {/*default screen*/}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="conversation-default-screen">
                    <Avatar size={110} icon={<LuMessageCirclePlus />} />
                    <span className="conversation-default-screen-ttl">
                      Tus mensajes
                    </span>
                    <span className="conversation-default-screen-subttl">
                      Envía fotos y mensajes privados a un amigo o grupo
                    </span>
                    <Button
                      type="primary"
                      onClick={() => {
                        showModal();
                      }}
                    >
                      Enviar mensaje
                    </Button>
                  </div>
                </>
              }
            />
            <Route path="/:userId" element={<RenderChatScreen />} />
          </Routes>

          {/*
            <div className="conversation-default-screen">
              <Avatar size={110} icon={<LuMessageCirclePlus />} />
              <span className="conversation-default-screen-ttl">
                Tus mensajes
              </span>
              <span className="conversation-default-screen-subttl">
                Envía fotos y mensajes privados a un amigo o grupo
              </span>
              <Button
                type="primary"
                onClick={() => {
                  showModal();
                }}
              >
                Enviar mensaje
              </Button>
            </div>
            */}
        </div>
      </div>

      <NewMessageModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loadingSelectConversationModal}
        setLoading={setLoadingSelectConversationModal}
      />
    </>
  );
};

export default MessagesScreen;
