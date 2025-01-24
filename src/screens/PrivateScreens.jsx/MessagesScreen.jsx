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
import {
  decrementNonRead,
  setSelectedConversationSlice,
} from "../../slice/messageSlice";
import { store } from "../../store/store";
import RenderChatScreen from "../../components/PrivateComponents/Messages/RenderChatScreen";
import { setConversationsInbox } from "../../slice/conversationSlice";

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [switchConversation, setSwitchConversation] = useState(false);
  //slices data
  //message screen is the right screen
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
    console.log(userData);
    setTimeout(() => {
      resetData();
      setIsModalOpen(false);
    }, 2000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function markMessageAsRead(conversations, conversationId, lastMessageId) {
    const updateConversationsArray = conversations.map((item) => {
      if (item.conversation._id === conversationId) {
        const updateMessagesArray = item.messages.messages.map((message) => {
          if (message._id === lastMessageId) {
            return {
              ...message,
              isRead: true,
            };
          }
          return message;
        });

        return {
          ...item,
          messages: {
            ...item.messages,
            messages: updateMessagesArray,
          },
        };
      }
      return item;
    });
    return updateConversationsArray;
  }

  const HandleSelectConversation = (conversation) => {
    const userId = userData._id;
    const conversationId = conversation.conversation._id;
    const lastMessageId = conversation.messages.messages[0]._id;
    const reciverId = conversation.messages.messages[0].receiver;
    const isRead = conversation.messages.messages[0].isRead;

    if (userId === reciverId && isRead === false) {
      const updateConversationsArray = markMessageAsRead(
        conversationsInbox,
        conversationId,
        lastMessageId
      );

      dispatch(setConversationsInbox(updateConversationsArray));
      dispatch(decrementNonRead());
    }
    setSwitchConversation(true);
    navigate("/messages/inbox");
    setTimeout(() => {
      navigate(`/messages/inbox/${conversation.conversation.user._id}`);
      setSwitchConversation(false);
    }, 10);
  };

  useEffect(() => {
    console.log("user data from message screen");
    console.log(userData);
  }, []);

  return (
    <>
      <div className="messages-screen-container">
        <div className="messages-aside">
          <div className="messages-aside-header">
            <div className="messages-aside-header-name">
              {userData.avatar_img === "" ||
              userData.avatar_img === undefined ? (
                <Avatar size={42} icon={<UserOutlined />} />
              ) : (
                <Avatar size={42} src={userData.avatar_img} />
              )}
              <span>{userData.username} </span>
            </div>
            <div className="messages-aside-header-nav">
              <span
                style={{ cursor: "pointer" }}
                className="messages-aside-header-nav-item-cta"
              >
                Inbox
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
                Requests
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
                  {switchConversation ? (
                    <></>
                  ) : (
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
                  )}
                </>
              }
            />
            <Route path="/:userId" element={<RenderChatScreen />} />
          </Routes>
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
