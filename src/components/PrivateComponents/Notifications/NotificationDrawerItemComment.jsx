import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";

const NotificationDrawerItemComment = () => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>

          <div>@joshuaHoward ha comentado tu post</div>
          <GoDotFill style={{ fontSize: 20 }} />
        </div>
        <div className="notification-content-container">
          @userTester Discover the future of artificial intelligence!
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemComment;
