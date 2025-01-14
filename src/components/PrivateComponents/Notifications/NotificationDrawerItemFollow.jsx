import { Avatar } from "antd";
import React from "react";
import { GoDotFill } from "react-icons/go";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";

const NotificationDrawerItemFollow = ({ item }) => {
  const { theme, toggleTheme } = useTheme();

  //Catch when someone is follow me
  return (
    <>
      <div className="notification-drawer-item-container">
        <div className="notification-drawer-item-header notification-drawer-item-header-follow">
          <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>
          <div>
            <span className="info-name-lbl">{item.user.username}</span> has
            started following you <span className="info-date-lbl">1 h.</span>
          </div>
          {item.follow === false ? (
            <AntdPrimaryBtnComponent
              label={"Follow"}
              style={{ border: "none", width: "75px", fontSize: 12 }}
              theme={theme}
            />
          ) : (
            <AntdSecondaryBtnComponent
              label={"Following"}
              style={{
                border: "none",
                border: `1px solid ${
                  theme === "dark" ? "#8a8a8a76" : "#a7a7a771"
                }`,
                width: "75px",
                fontSize: 12,
              }}
              theme={theme}
            />
          )}
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

export default NotificationDrawerItemFollow;
