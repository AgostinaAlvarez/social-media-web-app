import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { HiMiniChatBubbleLeft } from "react-icons/hi2";

const NotificationDrawerItemComment = () => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>

          <div>
            <span className="info-name-lbl">joshuaHoward</span> has commented on
            your post <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill style={{ fontSize: 20, color: "#4096ff" }} />
        </div>
        <div className="notification-content-container notification-content-comment-container">
          <div className="notification-content-icon notification-content-icon-comment">
            <HiMiniChatBubbleLeft />
          </div>
          <div>
            <span style={{ color: "#4096ff" }}>@userTester</span> Discover the
            future of artificial intelligence!
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemComment;
