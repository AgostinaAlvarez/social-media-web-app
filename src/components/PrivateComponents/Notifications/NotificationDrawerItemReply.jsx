import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";

const NotificationDrawerItemReply = () => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>

          <div>
            <span className="info-name-lbl">someuser</span> has replied to a
            comment on your post <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill style={{ fontSize: 20, color: "#4096ff" }} />
        </div>
        <div className="notification-content-container notification-content-comment-container">
          <div className="notification-content-icon notification-content-icon-comment">
            <HiMiniChatBubbleLeftRight />
          </div>
          <div>
            <span style={{ color: "#4096ff" }}>@userTester</span> and{" "}
            <span style={{ color: "#4096ff" }}>@someuser2</span> Discover the
            future of artificial intelligence!
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemReply;
