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
      {userData.avatar_img === "" ? (
        <Avatar
          style={{
            backgroundColor: "#87d068",
          }}
        >
          {userData.name[0]}
        </Avatar>
      ) : (
        <Avatar src={userData.avatar_img} />
      )}
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
