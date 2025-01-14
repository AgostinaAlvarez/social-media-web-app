import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";

const NotificationDrawerItemReply = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>

          <div>
            <span className="info-name-lbl">{item.user.username}</span> has
            replied to a comment on your post{" "}
            <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill
            style={{
              fontSize: 20,
              color: `${item.opened ? "transparent" : "#4096ff"}`,
            }}
          />
        </div>
        <div className="notification-content-container notification-content-comment-container">
          <div className="notification-content-icon notification-content-icon-comment">
            <HiMiniChatBubbleLeftRight />
          </div>
          <div>
            <span style={{ color: "#4096ff" }}>@userTester</span> and{" "}
            <span style={{ color: "#4096ff" }}>
              @{item.comment.user.username}
            </span>{" "}
            Discover the future of artificial intelligence!
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemReply;
