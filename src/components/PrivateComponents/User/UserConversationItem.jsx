import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "../../../styles/userItem.css";

const UserConversationItem = ({ conversation, selectConversation }) => {
  const userData = conversation?.conversation.user;
  const lastMessage = conversation?.messages.messages[0];

  return (
    <div
      className="user-item-container user-item-hover-conversation user-item-conversation-container"
      onClick={() => {
        //console.log(conversation);
        if (selectConversation) {
          selectConversation(conversation);
        }
      }}
    >
      <Avatar
        size={42}
        icon={<UserOutlined />}
        style={{
          backgroundColor: "#87d068",
        }}
      />
      <div className="user-item-info">
        <span className="user-item-conversation-info-username">
          {userData.name} {userData.lastname}
        </span>
        <span className="user-item-conversation-info-message">
          {lastMessage.content}
        </span>
      </div>
    </div>
  );
};

export default UserConversationItem;
