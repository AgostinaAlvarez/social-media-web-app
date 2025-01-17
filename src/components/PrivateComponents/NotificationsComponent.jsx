import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../slice/drawerSlice";
import { Avatar } from "antd";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import NotificationDrawerItemLikes from "./Notifications/NotificationDrawerItemLikes";
import NotificationDrawerItemComment from "./Notifications/NotificationDrawerItemComment";
import NotificationDrawerItemReply from "./Notifications/NotificationDrawerItemReply";
import NotificationDrawerItemFollow from "./Notifications/NotificationDrawerItemFollow";
import NotificationDrawerItemSave from "./Notifications/NotificationDrawerItemSave";
import NotificationDrawerItemFollowRequestAccepted from "./Notifications/NotificationDrawerItemFollowRequestAccepted";
import NotificationDrawerItemLike from "./Notifications/NotificationDrawerItemLike";

const NotificationsComponent = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([
    {
      type: "new_follower",
      opened: false,
      user: {
        username: "ashleySimmons",
      },
      follow: false,
    },
    {
      type: "like",
      opened: false,
      users: ["loganChapman", "jackson.jenkins", "connor_warren"],
    },
    {
      type: "comment",
      opened: false,
      user: {
        username: "nathanBryant",
      },
    },
    {
      type: "save",
      opened: false,
      user: {
        username: "jamesHughes",
      },
    },
    {
      type: "new_following",
      opened: true,
      user: {
        username: "oliverBennett",
      },
    },
    {
      type: "reply",
      opened: true,
      user: {
        username: "braydenOwens",
      },
      comment: {
        user: {
          username: "someUserComment",
        },
      },
    },
    {
      type: "new_follower",
      opened: true,
      user: {
        username: "joshuaHoward",
      },
      follow: true,
    },
    {
      type: "like",
      opened: true,
      users: ["laylaMyers"],
    },
  ]);

  const RenderNotificationItem = (item) => {
    const type = item.type;
    switch (type) {
      case "new_follower":
        return <NotificationDrawerItemFollow item={item} />;
      case "like":
        if (item.users.length === 1) {
          return <NotificationDrawerItemLike item={item} />;
        }
        return <NotificationDrawerItemLikes item={item} />;
      case "comment":
        return <NotificationDrawerItemComment item={item} />;
      case "save":
        return <NotificationDrawerItemSave item={item} />;
      case "new_following":
        return <NotificationDrawerItemFollowRequestAccepted item={item} />;
      case "reply":
        return <NotificationDrawerItemReply item={item} />;
    }
  };

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
              {notifications.map((notification) => (
                <>{RenderNotificationItem(notification)}</>
              ))}
              <div className="comment-footer-container">
                <span>View more</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsComponent;
