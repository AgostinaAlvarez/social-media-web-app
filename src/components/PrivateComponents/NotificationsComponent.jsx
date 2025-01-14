import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../slice/drawerSlice";
import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import UserItem from "./User/UserItem";
import NotificationDrawerItem from "./Notifications/NotificationDrawerItem";
import NotificationDrawerItemLikes from "./Notifications/NotificationDrawerItemLikes";
import NotificationDrawerItemComment from "./Notifications/NotificationDrawerItemComment";
import NotificationDrawerItemReply from "./Notifications/NotificationDrawerItemReply";
import NotificationDrawerItemFollow from "./Notifications/NotificationDrawerItemFollow";
import NotificationDrawerItemSave from "./Notifications/NotificationDrawerItemSave";
import NotificationDrawerItemFollowRequestAccepted from "./Notifications/NotificationDrawerItemFollowRequestAccepted";
import NotificationDrawerItemLike from "./Notifications/NotificationDrawerItemLike";

const NotificationsComponent = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([1]);

  return (
    <>
      <div className="notifications-component-container">
        <div
          className="notifications-header-container"
          onClick={() => {
            dispatch(setDrawerType("follow_request"));
          }}
        >
          <div className="notifications-header-users-container">
            <Avatar.Group>
              <Avatar
                size={30}
                style={{ backgroundColor: "#f56a00", fontSize: 13 }}
              >
                K
              </Avatar>
              <Avatar
                size={30}
                style={{ backgroundColor: "#87d068", fontSize: 13 }}
              >
                A
              </Avatar>
            </Avatar.Group>
            <div className="notifications-header-users-info">
              <span className="info-name-lbl">Solicitudes de seguimiento</span>
              <span>@username and 20 others</span>
            </div>
          </div>
          <MdOutlineArrowForwardIos />
        </div>
        <div className="notifications-component-results-container">
          {notifications.length === 0 ? (
            <>
              <span className="search-component-empty-ttl ">Recientes</span>
              <div className="search-component-empty-container">
                <span>No hay notificaciones recientes.</span>
              </div>
            </>
          ) : (
            <>
              {/*REAL*/}
              <NotificationDrawerItemFollow
                item={{ username: "ashleySimmons", followed: false }}
              />
              <NotificationDrawerItemFollow
                item={{ username: "joshuaHoward", followed: true }}
              />

              <NotificationDrawerItemFollow
                item={{ username: "natalieWard", followed: true }}
              />
              <NotificationDrawerItemFollowRequestAccepted
                item={{ username: "oliverBennett" }}
              />
              {/*TEST*/}
              <NotificationDrawerItemComment />
              <NotificationDrawerItemLike />
              <NotificationDrawerItemSave />
              <NotificationDrawerItemFollow
                item={{ username: "someuser1", followed: true }}
              />
              <NotificationDrawerItemLikes />
              <NotificationDrawerItemReply />

              <NotificationDrawerItemLikes />
              <NotificationDrawerItemFollow
                item={{ username: "someuser", followed: true }}
              />
            </>
          )}
        </div>
      </div>
      {/*
      
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
          {
            //This is notification render stats
          }
          {notifications.length === 0 ? (
            <>
              <div className="notifications-empty-compoenent">
                <span className="notifications-component-empty-ttl ">
                  Notificaciones
                </span>
                <div className="notifications-component-empty-container">
                  <span>No hay notificaciones recientes.</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflowY: "scroll",
                  backgroundColor: "pink",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "2000px",
                    backgroundColor: "red",
                  }}
                >
                  Hola
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      */}
    </>
  );
};

export default NotificationsComponent;
