import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { HiBookmark } from "react-icons/hi";

const NotificationDrawerItemSave = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>

          <div>
            <span className="info-name-lbl">{item.user.username}</span> saved
            your post <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill
            style={{
              fontSize: 20,
              color: `${item.opened ? "transparent" : "#4096ff"}`,
            }}
          />
        </div>
        <div className="notification-content-container notification-content-comment-container">
          <div className="notification-content-icon notification-content-icon-save">
            <HiBookmark />
          </div>
          <div>
            GPT models are reshaping industries like healthcare, education, and
            software development
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemSave;
