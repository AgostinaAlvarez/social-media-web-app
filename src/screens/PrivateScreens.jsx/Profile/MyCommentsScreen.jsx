import React from "react";
import ProfileCard from "../../../components/PrivateComponents/Home/ProfileCard";
import { LuArrowUpDown } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiMiniChatBubbleLeft } from "react-icons/hi2";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileStatsCard from "../../../components/PrivateComponents/Profile/ProfileStatsCard";
const MyCommentsScreen = () => {
  return (
    <div className="home-screen-private-container">
      <div className="home-screen-feed">
        <div className="stats-screen">
          <div className="stats-screen-header">
            <div className="stats-screen-header-box">
              <span>Comments</span>
              <span className="stats-screen-header-value-lbl">20</span>
            </div>
            <div className="stats-screen-header-box stats-screen-header-filter-container">
              <LuArrowUpDown />
              <span>MostRecent</span>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="stats-screen-content">
            {/*Item */}
            <div className="stats-screen-comment-container">
              <HiMiniChatBubbleLeftRight className="stats-screen-comment-icon-reply" />
              <div className="stats-screen-comment-container-content">
                <div className="stats-screen-comment-box stats-screen-comment-root-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <span className="info-name-lbl">Grace</span>
                    <span className="info-username-lbl">commented on</span>
                    <span className="info-name-lbl">User Name</span>
                    <span className="stats-screen-comment-link-lbl">Post</span>

                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      3 d.
                    </span>
                  </div>

                  <p style={{ margin: "0" }}>
                    Reading The Alchemist inspired me to rethink my priorities.
                    It’s not just a story about achieving dreams but about the
                    courage to start. Santiago’s persistence, despite fear and
                    doubt, taught me that true growth happens when we take
                    risks, even when the outcome isn’t guaranteed. It’s a lesson
                    I’ll always carry.{" "}
                  </p>
                </div>
                <div className="stats-screen-comment-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div className="stats-screen-comment-box-my-content-container">
                    <span className="stats-screen-comment-at-sign">
                      @username
                    </span>
                    <span>and</span>
                    <span className="stats-screen-comment-at-sign">@grace</span>
                    <p style={{ margin: "0px" }}>
                      Que genial este contenido!!!
                    </p>
                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      2 h.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*Item */}
            <div className="stats-screen-comment-container">
              <HiMiniChatBubbleLeft className="stats-screen-comment-icon" />
              <div className="stats-screen-comment-container-content">
                <div className="stats-screen-comment-box stats-screen-comment-root-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <span className="info-name-lbl">User Name</span>
                    <span className="info-username-lbl">@username</span>
                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      3 d.
                    </span>
                  </div>

                  <p style={{ margin: "0" }}>
                    📚 What book changed the way you see life? Recommend it and
                    tell us why. Maybe someone will find their next great read
                    thanks to you. 🌟
                  </p>
                </div>
                <div className="stats-screen-comment-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div className="stats-screen-comment-box-my-content-container">
                    <span className="stats-screen-comment-at-sign">
                      @username
                    </span>
                    <p style={{ margin: "0px" }}>
                      Que genial este contenido!!!
                    </p>
                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      2 h.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*Item */}
            <div className="stats-screen-comment-container">
              <HiMiniChatBubbleLeftRight className="stats-screen-comment-icon-reply" />
              <div className="stats-screen-comment-container-content">
                <div className="stats-screen-comment-box stats-screen-comment-root-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <span className="info-name-lbl">Federick</span>
                    <span className="info-username-lbl">commented on</span>
                    <span className="info-name-lbl">User Name</span>
                    <span className="stats-screen-comment-link-lbl">Post</span>

                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      3 d.
                    </span>
                  </div>

                  <p style={{ margin: "0" }}>
                    That book helped me realize that dreams are personal, and
                    not everyone will understand them.{" "}
                  </p>
                </div>
                <div className="stats-screen-comment-box">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                    className="stats-screen-comment-box-avatar"
                  />
                  <div className="stats-screen-comment-box-my-content-container">
                    <span className="stats-screen-comment-at-sign">
                      @username
                    </span>
                    <span>and</span>
                    <span className="stats-screen-comment-at-sign">
                      @federick
                    </span>
                    <p style={{ margin: "0px" }}>
                      Que genial este contenido!!!
                    </p>
                    <span
                      className="info-username-lbl"
                      style={{ marginLeft: 10 }}
                    >
                      2 h.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-private-aside">
        <ProfileCard />
        <ProfileStatsCard />
      </div>
    </div>
  );
};

export default MyCommentsScreen;
