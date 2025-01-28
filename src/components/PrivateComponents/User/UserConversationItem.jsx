import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "../../../styles/userItem.css";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { tranformDateToHour } from "../../../data/utils/dates";
import {
  messageSenderByMe,
  renderLastMessageConversationItem,
} from "../../../data/utils/messages";

const UserConversationItem = ({ conversation, selectConversation, hour }) => {
  const userData = conversation?.conversation.user;
  const lastMessage = conversation?.messages.messages[0];
  const navigate = useNavigate();
  const ConversationStatus = (lastMessage) => {
    if (lastMessage.receiver !== userData._id && lastMessage.isRead === false) {
      return true;
    }
    return false;
  };

  return (
    <div
      className="user-item-hover-conversation"
      style={{
        width: "100%",
        cursor: "pointer",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        padding: "13px 16px",
        gap: "7px",
      }}
      onClick={() => {
        if (selectConversation) {
          selectConversation(conversation);
        }
      }}
    >
      {userData.avatar_img === "" || userData.avatar_img === null ? (
        <Avatar
          size={45}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#87d068",
          }}
        />
      ) : (
        <Avatar size={45} src={userData.avatar_img} />
      )}
      <div className="user-item-info" style={{ gap: "3px" }}>
        <span className="user-item-conversation-info-username">
          {userData.name} {userData.lastname}
        </span>
        <div
          style={{ width: "100%" }}
          className={`user-item-conversation-info-message ${
            ConversationStatus(lastMessage) === true
              ? "user-item-conversation-info-message-cta"
              : ""
          }`}
        >
          {messageSenderByMe(lastMessage.receiver, userData._id)
            ? "You: "
            : null}
          {renderLastMessageConversationItem(lastMessage.content)}
          {/*lastMessage.content*/}
          <span style={{ marginLeft: 10, fontSize: 12 }}>{hour}</span>
        </div>
      </div>
      <div
        style={{
          width: "16px",
          fontSize: "16px",
          color: "#4096ff",
        }}
      >
        {ConversationStatus(lastMessage) === true && <GoDotFill />}
      </div>
    </div>
  );
};

export default UserConversationItem;
