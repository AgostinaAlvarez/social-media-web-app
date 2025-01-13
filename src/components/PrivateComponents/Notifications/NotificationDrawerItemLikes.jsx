import { Avatar } from "antd";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";

const NotificationDrawerItemLikes = () => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header notification-drawer-item-header-multiple-users">
          <Avatar.Group>
            <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
              K
            </Avatar>
            <Avatar size={30} style={{ backgroundColor: "#87d068" }}>
              A
            </Avatar>
          </Avatar.Group>
          <div>
            A @joshuaHoward, @natalieWard y @samanthaRivera les ha gustado tu
            Post
          </div>
          <GoDotFill style={{ fontSize: 20 }} />
        </div>
        <div className="notification-content-container">
          Discover the future of artificial intelligence! GPT models are
          reshaping industries like healthcare, education, and software
          development. What role do you see AI playing in the next decade?
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemLikes;
