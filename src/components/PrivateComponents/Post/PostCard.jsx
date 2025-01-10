import React from "react";
import { postDateTranform } from "../../../data/utils/dates";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { BsBookmarkFill, BsThreeDots } from "react-icons/bs";
import { AntDesignOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFeedForYouPosts } from "../../../slice/feedSlice";
import { AiFillHeart } from "react-icons/ai";

export const PostFeedCard = ({
  index,
  item,
  HandleSelect,
  HandleOpenCommentsModal,
  HandleOpenLikesModal,
  stats,
}) => {
  const StopPropagation = (e) => {
    e.stopPropagation();
  };
  const feedForYouPosts = useSelector(
    (state) => state.feedSlice.feedForYouPosts
  );
  const dispatch = useDispatch();

  return (
    <div
      className="post-container post-feed-card"
      key={index}
      onClick={HandleSelect}
    >
      <div className="post-header" onClick={StopPropagation}>
        <div className="post-header-user-data-container">
          {item.user.avatar ? (
            <Avatar src={item.user.avatar} size={40} />
          ) : (
            <Avatar icon={<UserOutlined />} size={40} />
          )}
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
      {item.post.url && (
        <div
          style={{ width: "100%", borderRadius: "15px", overflow: "hidden" }}
          onClick={StopPropagation}
        >
          <Image width={"100%"} src={item.post.url} />
        </div>
      )}
      <div className="post-feed-card-footer" onClick={StopPropagation}>
        {/*Comments */}
        <div
          className="post-content-footer-stats-item post-comment-stat-hover post-feed-stat-item post-feed-stat-item-hover"
          onClick={() => {
            HandleOpenCommentsModal();
          }}
        >
          <FaRegComment />
          <span>{stats.comments}</span>
        </div>
        {/*Like*/}
        <div
          className={`post-content-footer-stats-item post-like-stat-hover post-feed-stat-item post-feed-stat-item-hover ${
            item.actions.liked === true ? "post-like-stat-cta" : ""
          }`}
        >
          <div
            className="heart-container"
            onClick={() => {
              const updateData = feedForYouPosts.map((post) => {
                if (post.post.id === item.post.id) {
                  return {
                    ...post,
                    stats: {
                      ...stats,
                      likes: post.stats.likes + 1,
                    },
                    actions: {
                      ...post.actions,
                      liked: true,
                    },
                  };
                }
                return post;
              });
              dispatch(setFeedForYouPosts(updateData));
            }}
          >
            <AiFillHeart
              className={`heart-icon ${item.actions.liked ? "liked" : ""}`}
            />
            {item.actions.liked && (
              <div className="particles">
                {[...Array(6)].map((_, i) => (
                  <AiFillHeart key={i} className={`particle particle-${i}`} />
                ))}
              </div>
            )}
          </div>
          <span onClick={HandleOpenLikesModal}>{item.stats.likes}</span>
        </div>
        {/*Save*/}
        <div
          className={`post-content-footer-stats-item post-save-stat-hover post-feed-stat-item post-feed-stat-item-hover ${
            item.actions.saved === true ? "post-save-stat-cta" : ""
          }`}
          onClick={() => {
            const updateData = feedForYouPosts.map((post) => {
              if (post.post.id === item.post.id) {
                return {
                  ...post,
                  stats: {
                    ...stats,
                    saves: post.stats.saves + 1,
                  },
                  actions: {
                    ...post.actions,
                    saved: true,
                  },
                };
              }
              return post;
            });
            dispatch(setFeedForYouPosts(updateData));
          }}
        >
          <BsBookmarkFill
            className={`save-icon ${
              item.actions.saved === true ? "saved" : ""
            }`}
          />
          <span>{item.stats.saves}</span>
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
