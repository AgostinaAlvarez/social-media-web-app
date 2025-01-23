import { Avatar } from "antd";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { HiHeart } from "react-icons/hi";

const NotificationDrawerItemLike = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header ">
          {item.avatars ? (
            <Avatar size={30} src={item.avatars[0]} />
          ) : (
            <Avatar
              size={30}
              style={{ backgroundColor: "#4635B1", fontSize: 15 }}
            >
              {item.users[0][0].toUpperCase()}
            </Avatar>
          )}
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
            Imagine if someone made a movie about programmers but showed the
            actual work—just endless coffee, Stack Overflow, and staring at
            screens.
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemLike;
