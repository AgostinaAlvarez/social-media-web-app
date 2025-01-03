import React from "react";
import ProfileCard from "../../../components/PrivateComponents/Home/ProfileCard";
import { HiHeart } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileStatsCard from "../../../components/PrivateComponents/Profile/ProfileStatsCard";
import { HiBookmark } from "react-icons/hi";

import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";

const MySavedScreen = () => {
  const likes = [1, 1, 1, 1];
  return (
    <div className="home-screen-private-container">
      <div className="home-screen-feed">
        <div className="stats-screen">
          <div className="stats-screen-header">
            <div className="stats-screen-header-box">
              <span>Saved</span>
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
            {likes.map((item) => (
              <div className="stats-screen-like-container">
                <div className="stats-screen-saved-icon-container">
                  <HiBookmark className="stats-screen-saved-icon" />
                </div>
                <div className="stats-screen-like-col-right">
                  <div className="stats-screen-like-header">
                    <span className="info-date-lbl ">
                      saved on Wednesday, Oct 16, 6:02 PM
                    </span>
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
                      📚 What book changed the way you see life? Recommend it
                      and tell us why. Maybe someone will find their next great
                      read thanks to you. 🌟
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
