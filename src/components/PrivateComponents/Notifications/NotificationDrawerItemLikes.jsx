import { Avatar } from "antd";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { HiHeart } from "react-icons/hi";

const NotificationDrawerItemLikes = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header notification-drawer-item-header-multiple-users">
          <Avatar.Group>
            <Avatar size={26} src={item.avatars[0]} />

            <Avatar size={26} src={item.avatars[1]} />
          </Avatar.Group>
          <div>
            <span className="info-name-lbl">{item.users[0]}</span>,{" "}
            <span className="info-name-lbl">{item.users[1]}</span> and{" "}
            <span className="info-name-lbl">{item.users[2]}</span> liked your
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
            Discover the future of artificial intelligence! GPT models are
            reshaping industries like healthcare, education, and software
            development. What role do you see AI playing in the next decade?
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemLikes;
