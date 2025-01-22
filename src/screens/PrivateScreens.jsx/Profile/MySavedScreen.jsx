import React from "react";
import ProfileCard from "../../../components/PrivateComponents/Home/ProfileCard";
import { HiHeart } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileStatsCard from "../../../components/PrivateComponents/Profile/ProfileStatsCard";
import { HiBookmark } from "react-icons/hi";

import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { saved_posts } from "../../../../tester_data";
import { postDateTranform } from "../../../data/utils/dates";

const MySavedScreen = () => {
  const saves = saved_posts;
  return (
    <div className="home-screen-private-container">
      <div className="home-screen-feed">
        <div className="stats-screen">
          <div className="stats-screen-header">
            <div className="stats-screen-header-box">
              <span style={{ color: "grey", fontSize: 14 }}>Saves</span>
              <span
                className="stats-screen-header-value-lbl"
                style={{ color: "#00ba7c", backgroundColor: "#00ba7c37" }}
              >
                49
              </span>
            </div>
            <div className="stats-screen-header-box stats-screen-header-filter-container">
              <LuArrowUpDown />
              <span>MostRecent</span>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="stats-screen-content">
            {/*Item */}
            {saves.map((item) => (
              <div className="stats-screen-like-container">
                <div className="stats-screen-saved-icon-container">
                  <HiBookmark className="stats-screen-saved-icon" />
                </div>
                <div className="stats-screen-like-col-right">
                  <div className="stats-screen-like-header">
                    <span className="info-date-lbl ">
                      saved on {postDateTranform(item.save.createdAt)}
                    </span>
                  </div>

                  <div className="stats-screen-comment-box">
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
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
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
                </div>
              </div>
            ))}
            <div className="comment-footer-container">
              <span>View {49 - saves.length} more</span>
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

export default MySavedScreen;
