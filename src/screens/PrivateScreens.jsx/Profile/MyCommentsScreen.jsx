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
import { commented_posts } from "../../../../tester_data";
const MyCommentsScreen = () => {
  return (
    <div className="home-screen-private-container">
      <div className="home-screen-feed">
        <div className="stats-screen">
          <div className="stats-screen-header">
            <div className="stats-screen-header-box">
              <span style={{ color: "grey", fontSize: 14 }}>Comments</span>
              <span
                className="stats-screen-header-value-lbl"
                style={{ color: "#1d9bf0", backgroundColor: "#1d9cf041" }}
              >
                25
              </span>
            </div>
            <div className="stats-screen-header-box stats-screen-header-filter-container">
              <LuArrowUpDown />
              <span>MostRecent</span>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="stats-screen-content">
            {commented_posts.map((item) => (
              <>
                {item.reply ? (
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <span className="info-name-lbl">
                            {item.user.name} {item.user.lastname}
                          </span>
                          <span className="info-username-lbl">
                            commented on
                          </span>
                          <span className="info-name-lbl">
                            {item.post.author}
                          </span>
                          <span className="stats-screen-comment-link-lbl">
                            Post
                          </span>

                          <span
                            className="info-username-lbl"
                            style={{ marginLeft: 10 }}
                          >
                            3 d.
                          </span>
                        </div>

                        <p style={{ margin: "0" }}>{item.comment.comment}</p>
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
                          <p style={{ margin: "0px" }}>
                            <span className="stats-screen-comment-at-sign">
                              @{item.post.authorUsername}
                            </span>
                            <span>and</span>
                            <span className="stats-screen-comment-at-sign">
                              @{item.user.username}
                            </span>
                            {item.reply.reply}
                            <span
                              className="info-username-lbl"
                              style={{ marginLeft: 10 }}
                            >
                              2 h.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <span className="info-name-lbl">
                            {item.user.name} {item.user.lastname}
                          </span>
                          <span className="info-username-lbl">
                            @{item.user.username}
                          </span>
                          <span
                            className="info-username-lbl"
                            style={{ marginLeft: 10 }}
                          >
                            3 d.
                          </span>
                        </div>

                        <p style={{ margin: "0" }}>{item.post.content}</p>
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
                          <p style={{ margin: "0px" }}>
                            <span
                              className="stats-screen-comment-at-sign"
                              style={{ marginRight: 6 }}
                            >
                              @{item.user.username}
                            </span>
                            {item.comment.comment}
                            <span
                              className="info-username-lbl"
                              style={{ marginLeft: 10 }}
                            >
                              2 h.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
            <div>
              <span>View {25 - commented_posts.length} more</span>
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
