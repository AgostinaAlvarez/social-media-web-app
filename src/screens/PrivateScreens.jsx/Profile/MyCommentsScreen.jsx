import React from "react";
import ProfileCard from "../../../components/PrivateComponents/Home/ProfileCard";
import { LuArrowUpDown } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiMiniChatBubbleLeft } from "react-icons/hi2";

import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileStatsCard from "../../../components/PrivateComponents/Profile/ProfileStatsCard";
import { commented_posts } from "../../../../tester_data";
import { useSelector } from "react-redux";
import { postDateTranform } from "../../../data/utils/dates";
const MyCommentsScreen = () => {
  const userData = useSelector((state) => state.userSlice.userData);

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
                36
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
                        {item.user.avatar ? (
                          <Avatar
                            className="stats-screen-comment-box-avatar"
                            src={item.user.avatar}
                            size={40}
                          />
                        ) : (
                          <Avatar
                            className="stats-screen-comment-box-avatar"
                            size={40}
                            style={{
                              backgroundColor: "#A294F9",
                            }}
                          >
                            {item.user.name[0]}
                          </Avatar>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                          }}
                        >
                          <p style={{ margin: 0 }}>
                            <span
                              className="info-name-lbl"
                              style={{ marginRight: 3 }}
                            >
                              {item.user.name} {item.user.lastname}
                            </span>
                            <span
                              className="info-username-lbl"
                              style={{ marginRight: 3 }}
                            >
                              commented on
                            </span>
                            <span
                              className="info-name-lbl"
                              style={{ marginRight: 3 }}
                            >
                              {item.post.author}
                            </span>
                            <span className="stats-screen-comment-link-lbl">
                              Post
                            </span>
                          </p>
                          <span
                            className="info-username-lbl"
                            style={{ fontSize: 13 }}
                          >
                            {postDateTranform(item.comment.createdAt)}
                          </span>
                        </div>

                        <p style={{ margin: "0" }}>{item.comment.comment}</p>
                      </div>
                      <div className="stats-screen-comment-box">
                        {userData.avatar_img === "" ? (
                          <Avatar
                            size={40}
                            className="stats-screen-comment-box-avatar"
                          >
                            T
                          </Avatar>
                        ) : (
                          <Avatar
                            size={40}
                            src={userData.avatar_img}
                            className="stats-screen-comment-box-avatar"
                          />
                        )}

                        <div className="stats-screen-comment-box-my-content-container">
                          <p style={{ margin: "0px" }}>
                            <span
                              className="stats-screen-comment-at-sign"
                              style={{ marginRight: 5 }}
                            >
                              @{item.post.authorUsername}
                            </span>
                            <span>and</span>
                            <span
                              className="stats-screen-comment-at-sign"
                              style={{ marginLeft: 5, marginRight: 5 }}
                            >
                              @{item.user.username}
                            </span>
                            {item.reply.reply}
                            <span
                              className="info-username-lbl"
                              style={{ marginLeft: 10 }}
                            >
                              {item.reply.time ? item.reply.time : "3 d."}
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
                        {item.user.avatar ? (
                          <Avatar
                            className="stats-screen-comment-box-avatar"
                            src={item.user.avatar}
                            size={40}
                          />
                        ) : (
                          <Avatar
                            className="stats-screen-comment-box-avatar"
                            size={40}
                            style={{
                              backgroundColor: "#A294F9",
                            }}
                          >
                            {item.user.name[0]}
                          </Avatar>
                        )}
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
                            {postDateTranform(item.post.createdAt)}
                          </span>
                        </div>

                        <p style={{ margin: "0" }}>{item.post.content}</p>
                        {item.post.url && (
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "15px",
                              overflow: "hidden",
                            }}
                          >
                            <Image width={"100%"} src={item.post.url} />
                          </div>
                        )}
                      </div>
                      <div className="stats-screen-comment-box">
                        {userData.avatar_img === "" ? (
                          <Avatar
                            size={40}
                            className="stats-screen-comment-box-avatar"
                          >
                            T
                          </Avatar>
                        ) : (
                          <Avatar
                            size={40}
                            src={userData.avatar_img}
                            className="stats-screen-comment-box-avatar"
                          />
                        )}
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
                              {item.comment.time ? item.comment.time : "set"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
            <div className="comment-footer-container">
              <span>View {36 - commented_posts.length} more</span>
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
