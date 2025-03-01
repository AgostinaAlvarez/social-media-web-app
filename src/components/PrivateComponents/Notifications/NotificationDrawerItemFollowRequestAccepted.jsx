import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";

const NotificationDrawerItemFollowRequestAccepted = ({ item }) => {
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header">
          {item.user.avatar ? (
            <Avatar size={30} src={item.user.avatar} />
          ) : (
            <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
              K
            </Avatar>
          )}

          <div>
            <span className="info-name-lbl">{item.user.username}</span> has
            accepted your follow request{" "}
            <span className="info-date-lbl">1 h.</span>
          </div>
          <GoDotFill
            style={{
              fontSize: 20,
              color: `${item.opened ? "transparent" : "#4096ff"}`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NotificationDrawerItemFollowRequestAccepted;
