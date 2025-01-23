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
        avatar:
          "https://pbs.twimg.com/profile_images/1527031974061256704/B9nbakqc_400x400.jpg",
      },
      follow: false,
    },
    {
      type: "like",
      opened: false,
      users: ["natalieWard", "andrewCook", "connor_warren"],
      avatars: [
        "https://pbs.twimg.com/profile_images/1589471094276296704/ScD4jIkE_400x400.jpg",
        "https://pbs.twimg.com/profile_images/1530649060943794178/6QE0SnyC_400x400.jpg",
      ],
    },
    {
      type: "comment",
      opened: false,
      user: {
        username: "nathanBryant",
        avatar:
          "https://pbs.twimg.com/profile_images/1790831627402158080/hVFqbFwG_400x400.jpg",
      },
    },
    {
      type: "save",
      opened: false,
      user: {
        username: "ariaAlexander",
        avatar:
          "https://pbs.twimg.com/profile_images/619430896328818690/kU-tALRM_400x400.jpg",
      },
    },
    {
      type: "new_following",
      opened: true,
      user: {
        username: "oliverBennett",
        avatar:
          "https://pbs.twimg.com/profile_images/1601416285702586368/V08c7STc_400x400.jpg",
      },
    },
    {
      type: "reply",
      opened: true,
      user: {
        username: "lucasFisher",
        avatar:
          "https://pbs.twimg.com/profile_images/1389007704367276037/EYcXQaO2_400x400.jpg",
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
        avatar:
          "https://pbs.twimg.com/profile_images/1450576617261215754/X_PXogRc_400x400.jpg",
      },
      follow: true,
    },
    {
      type: "like",
      opened: true,
      users: ["laylaMyers"],
    },
  ]);

  //helo
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
                src={
                  "https://pbs.twimg.com/profile_images/1720391010016989184/iXw5ZC5a_400x400.jpg"
                }
              />
              <Avatar
                size={30}
                src={
                  "https://pbs.twimg.com/profile_images/1870287696859463680/PVw_v6f9_400x400.jpg"
                }
              />
            </Avatar.Group>
            <div className="notifications-header-users-info">
              <span className="info-name-lbl">Follow requests</span>
              <span className="info-username-lbl">
                @elijah_scott98 and 20 others
              </span>
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
