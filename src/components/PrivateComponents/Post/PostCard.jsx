import React from "react";
import { postDateTranform } from "../../../data/utils/dates";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AntDesignOutlined } from "@ant-design/icons";

export const PostFeedCard = ({
  index,
  item,
  HandleSelect,
  HandleOpenCommentsModal,
  HandleOpenLikesModal,
}) => {
  const StopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="post-container post-feed-card"
      key={index}
      onClick={HandleSelect}
    >
      <div className="post-header" onClick={StopPropagation}>
        <div className="post-header-user-data-container">
          <Avatar icon={<UserOutlined />} />
          <div className="post-header-user-data">
            <div className="post-header-user-data-name">
              <span className="info-name-lbl">
                {item.user.name} {item.user.lastname}
              </span>
              <span className="info-username-lbl">@{item.user.username}</span>
            </div>
            <span className="post-header-date info-date-lbl">
              {postDateTranform(item.post.createdAt)}
            </span>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <p className="post-content">{item.post.content}</p>
      <div className="post-feed-card-footer" onClick={StopPropagation}>
        {/*Comments */}
        <div
          className="post-content-footer-stats-item post-comment-stat-hover post-feed-stat-item post-feed-stat-item-hover"
          onClick={() => {
            HandleOpenCommentsModal();
          }}
        >
          <FaRegComment />
          <span>10</span>
        </div>
        {/*Like*/}
        <div className="post-content-footer-stats-item post-like-stat-hover post-feed-stat-item post-feed-stat-item-hover">
          <FaRegHeart />
          <span onClick={HandleOpenLikesModal}>10</span>
        </div>
        {/*Save*/}
        <div
          className="post-content-footer-stats-item post-save-stat-hover post-feed-stat-item post-feed-stat-item-hover"
          onClick={() => {
            console.log("guardar");
          }}
        >
          <FaRegBookmark />
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export const PostDetailCard = () => {
  return (
    <div>
      <span>PostCard</span>
    </div>
  );
};

export const PostNewCommentModal = ({
  totalComments,
  HandleOpenLikesModal,
}) => {
  return (
    <>
      {/*Post header*/}
      <div className="post-header">
        <div className="post-header-user-data-container">
          <Avatar icon={<UserOutlined />} />
          <div className="post-header-user-data">
            <div className="post-header-user-data-name">
              <span className="info-name-lbl">User Name</span>
              <span className="info-username-lbl">@username</span>
            </div>
            <span className="post-header-date info-date-lbl">
              Wednesday, Oct 16, 6:02 PM
            </span>
          </div>
        </div>
        <BsThreeDots />
      </div>
      {/*Content*/}
      <p className="post-content" style={{ width: "93%", lineHeight: 1.6 }}>
        📚 What book changed the way you see life? Recommend it and tell us why.
        Maybe someone will find their next great read thanks to you. 🌟
      </p>
      {/*Footer*/}
      <div className="post-content-footer">
        <div className="post-content-footer-likes-container">
          <Avatar.Group>
            <Avatar
              size={25}
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            />
            <a href="https://ant.design">
              <Avatar
                size={25}
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </a>
            <Tooltip title="Ant User" placement="top">
              <Avatar
                size={25}
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </Tooltip>
            <Avatar
              size={25}
              style={{
                backgroundColor: "#1677ff",
              }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
          <div style={{ cursor: "pointer" }} onClick={HandleOpenLikesModal}>
            <span className="stats-lbl">+100 Likes</span>
          </div>
        </div>
        <div className="post-content-footer-stats-container">
          <div className="post-content-footer-stats-item stats-lbl post-like-stat-hover">
            <FaRegHeart />
            <span>Like</span>
          </div>
          <div className="post-content-footer-stats-item stats-lbl">
            <FaRegComment />
            <span>Comments</span>
            <span className="post-content-footer-stats-value">
              {totalComments}
            </span>
          </div>
          <div className="post-content-footer-stats-item stats-lbl">
            <div className="post-content-footer-stats-item stats-lbl post-comment-stat-hover">
              <FaRegBookmark />
              <span>Saved</span>
            </div>
            <span className="post-content-footer-stats-value">5</span>
          </div>
        </div>
      </div>
    </>
  );
};
