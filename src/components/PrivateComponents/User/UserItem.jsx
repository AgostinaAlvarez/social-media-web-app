import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "../../../styles/userItem.css";

const UserItem = ({ userData, onSelectUser }) => {
  return (
    <div
      className="user-item-container user-item-hover"
      onClick={() => {
        if (onSelectUser) {
          onSelectUser(userData);
        }
      }}
    >
      <Avatar
        icon={<UserOutlined />}
        style={{
          backgroundColor: "#87d068",
        }}
      />
      <div className="user-item-info">
        <span>
          {userData?.name} {userData?.lastname}
        </span>
        <span className="user-item-info-username">@{userData?.username}</span>
      </div>
    </div>
  );
};

export default UserItem;
