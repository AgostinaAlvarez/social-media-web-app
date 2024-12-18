import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../slice/drawerSlice";
import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const NotificationsComponent = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="notifications-component-container">
      <div className="notifications-component-header">
        <div
          className="notifications-component-header-content"
          onClick={() => {
            dispatch(setDrawerType("follow_request"));
          }}
        >
          <div className="notifications-component-header-info-container">
            <Avatar.Group
              size={"small"}
              style={{
                gap: 0,
              }}
              /*
            max={{
              count: 2,
              style: {
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              },
            }}
            */
            >
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                K
              </Avatar>
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </Avatar.Group>
            <div className="notifications-component-header-info">
              <span className="notifications-component-header-ttl">
                Solicitudes de seguimiento
              </span>
              <span className="notifications-component-header-users">
                user.name and 20 others
              </span>
            </div>
          </div>
          <MdOutlineArrowForwardIos />
        </div>
      </div>
      <div className="notifications-component-results-container">
        {notifications.length === 0 ? (
          <>
            <span className="notifications-component-empty-ttl ">
              Notificaciones
            </span>
            <div className="notifications-component-empty-container">
              <span>No hay notificaciones recientes.</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NotificationsComponent;
