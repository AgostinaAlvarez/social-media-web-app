import { Avatar } from "antd";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";

const NotificationDrawerItem = ({ notification }) => {
  const renderNames = (users) => {
    if (users.length === 3) {
      return (
        <span>
          A {users[0]}, {users[1]} y {users[2]} les ha
        </span>
      );
    } else if (users.length === 2) {
      return (
        <span>
          A {users[0]} y {users[1]} les ha
        </span>
      );
    } else if (users.length === 1) {
      return <span>A {users[0]} le ha</span>;
    }
  };

  const renderNotificationType = (type) => {
    switch (type) {
      case "likes":
        return <span>liked</span>;
      case "comments":
        return <span>comment</span>;
    }
  };

  useEffect(() => {
    console.log(notification.users);
  }, []);

  return (
    <div className="notification-drawer-item-container">
      <Avatar.Group>
        <Avatar size={30} style={{ backgroundColor: "#f56a00" }}>
          K
        </Avatar>
        <Avatar size={30} style={{ backgroundColor: "#87d068" }}>
          A
        </Avatar>
      </Avatar.Group>
      <div className="notification-drawer-item-content">
        <div className="notification-drawer-item-content-header">
          <div>{renderNames(notification.users)} gustado tu Post</div>
          <GoDotFill style={{ fontSize: 20 }} />
        </div>
        <div className="notification-drawer-item-element-container">
          <span>
            Discover the future of artificial intelligence! GPT models are
            reshaping industries like healthcare, education, and software
            development. What role do you see AI playing in the next decade?
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawerItem;
