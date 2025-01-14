import { Avatar } from "antd";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { HiHeart } from "react-icons/hi";

const NotificationDrawerItemLike = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header ">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>
          <div>
            <span className="info-name-lbl">{item.users[0]}</span> liked your
            post <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill
            style={{
              fontSize: 20,
              color: `${item.opened ? "transparent" : "#4096ff"}`,
            }}
          />
        </div>
        <div className="notification-content-container">
          <div className="notification-content-icon notification-content-icon-like">
            <HiHeart />
          </div>

          <div>
            Education, and software development. What role do you see AI playing
            in the next decade?
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemLike;
