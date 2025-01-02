import { Avatar, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { AntDesignOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "../../../styles/postComponent.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

import { FaRegImage } from "react-icons/fa6";
import { MdInsertEmoticon } from "react-icons/md";

import { PiArrowBendDownRightBold } from "react-icons/pi";
import { comments_data, replies } from "../../../../tester_data";
import { LoadingOutlined } from "@ant-design/icons";
import NewReplieModal from "../../../components/PrivateComponents/Post/NewReplieModal";
import LikesOnPostModal from "../../../components/PrivateComponents/Post/LikesOnPostModal";

const PostScreen = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const HandleOpenReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

  const HandleOpenLikesModal = () => {
    setIsLikesModalOpen(true);
  };

  const stats = {
    totalComments: 8,
  };

  useEffect(() => {
    HandleRequestMoreComments();
  }, []);

  const HandleRequestMoreComments = () => {
    const current_comments_lenght = comments.length;
    if (current_comments_lenght === stats.totalComments) {
      console.log("no hay mas comentarios para pedir");
      return;
    }
    const nextComments = comments_data.slice(
      current_comments_lenght,
      current_comments_lenght + 3
    );

    const updateComments = [...comments, ...nextComments];

    setTimeout(() => {
      setLoading(false);
      setLoadingMoreComments(false);
      setComments(updateComments);
    }, 3000);
  };

  const loadingRepliesInitialState = {
    comment_id: null,
    loading: false,
  };
  const [loadingReplies, setLoadingReplies] = useState(
    loadingRepliesInitialState
  );

  const HandleRequestReplies = (
    comment_id,
    current_replies_lenght,
    total_replies,
    current_replies
  ) => {
    if (current_replies_lenght === 0) {
      console.log("pido los primeros dos");
      HandleRequestMoreReplies(
        comment_id,
        current_replies_lenght,
        total_replies,
        current_replies
      );
    }
  };

  const HandleRequestMoreReplies = (
    comment_id,
    current_replies_lenght,
    total_replies,
    current_replies
  ) => {
    setLoadingReplies({
      comment_id: comment_id,
      loading: true,
    });

    const find_replies = replies.find((item) => item.comment_id === comment_id);

    if (current_replies_lenght >= total_replies) {
      console.log("ya no hay nada para pedir");
      return;
    }

    const nextReplies = find_replies.replies.slice(
      current_replies_lenght,
      current_replies_lenght + 2
    );

    const updateReplies = [...current_replies, ...nextReplies];

    const updateComments = comments.map((item) => {
      if (item.comment.id === comment_id) {
        return {
          ...item,
          replies: updateReplies,
        };
      }
      return item;
    });

    setTimeout(() => {
      setLoadingReplies(loadingRepliesInitialState);
      setComments(updateComments);
    }, 3000);
  };

  const RenderReplies = (
    replie,
    index,
    replies_lenght,
    comment_id,
    current_replies_lenght,
    total_replies,
    current_replies
  ) => {
    const replies_lenght_nmbr = current_replies_lenght - 1;

    const spanRender = (count) => {
      if (count == 1) {
        return "reply";
      } else {
        return "replies";
      }
    };

    return (
      <div className="comment-container replie-container">
        <Avatar icon={<UserOutlined />} />
        <div className="comment-container-info-box">
          <span>
            {replie.user.name} {replie.user.lastname} @{replie.user.username}
          </span>
          <span>Date</span>
          <p className="comment-container-info-box-p">{replie.reply.content}</p>

          {index === replies_lenght_nmbr &&
          current_replies_lenght !== total_replies ? (
            <>
              {loadingReplies.comment_id === comment_id &&
              loadingReplies.loading === true ? (
                <div className="comment-replie-loading-container">
                  <Spin
                    //size="large"
                    indicator={<LoadingOutlined spin />}
                  />
                </div>
              ) : (
                <div
                  className="comment-container-replies-span"
                  onClick={() => {
                    HandleRequestMoreReplies(
                      comment_id,
                      current_replies_lenght,
                      total_replies,
                      current_replies
                    );
                  }}
                >
                  <PiArrowBendDownRightBold />
                  <span>
                    View {total_replies - current_replies_lenght} more{" "}
                    {spanRender(total_replies - current_replies_lenght)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="post-screen">
        {/*POST*/}
        <div className="post-screen-container">
          {/*Post header*/}
          <div className="post-header">
            <div className="post-header-user-data-container">
              <Avatar icon={<UserOutlined />} />
              <div className="post-header-user-data">
                <div className="post-header-user-data-name">
                  <span>User Name</span>
                  <span>@username</span>
                </div>
                <span className="post-header-date">date</span>
              </div>
            </div>
            <BsThreeDots />
          </div>
          {/*Content*/}
          <p className="post-content" style={{ width: "93%", lineHeight: 1.6 }}>
            📚 What book changed the way you see life? Recommend it and tell us
            why. Maybe someone will find their next great read thanks to you. 🌟
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
                <span>+100 Likes</span>
              </div>
            </div>
            <div className="post-content-footer-stats-container">
              <div className="post-content-footer-stats-item">
                <FaRegHeart />
                <span>Like</span>
              </div>
              <div className="post-content-footer-stats-item">
                <FaRegComment />
                <span>Comments</span>
                <span className="post-content-footer-stats-value">
                  {stats.totalComments}
                </span>
              </div>
              <div className="post-content-footer-stats-item">
                <FaRegBookmark />
                <span>Saved</span>
                <span className="post-content-footer-stats-value">5</span>
              </div>
            </div>
          </div>
          {/*Comments*/}
          <div className="post-content-container">
            <div className="post-content-input-container">
              <Avatar icon={<UserOutlined />} />
              <div className="post-content-input-box">
                <Input
                  style={{ width: "100%", height: "30px" }}
                  placeholder="Basic usage"
                  variant="borderless"
                />
                <div className="post-content-input-box-icons-container">
                  <FaRegImage />
                  <MdInsertEmoticon />
                </div>
              </div>
            </div>
            {/*Lista de comentarios*/}
            {loading === true ? (
              <div className="comment-replie-loading-container">
                <Spin
                  //size="large"
                  indicator={<LoadingOutlined spin />}
                />
              </div>
            ) : (
              <>
                <div className="comment-list">
                  {comments.map((item) => (
                    <div className="comment-container">
                      <Avatar icon={<UserOutlined />} />
                      <div className="comment-container-info-box">
                        <span>
                          {item.user.name} {item.user.lastname} @
                          {item.user.username}
                        </span>
                        <span>Date</span>
                        <p className="comment-container-info-box-p">
                          {item.comment.content}
                        </p>
                        {item.stats.replies === 0 ? (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-start",
                              boxSizing: "border-box",
                              padding: "0px",
                              color: "grey",
                            }}
                          >
                            <div
                              className="post-content-footer-stats-item post-content-footer-stats-value "
                              style={{
                                color: "#4096ff",
                                cursor: "pointer",
                              }}
                              onClick={HandleOpenReplyModal}
                            >
                              <span>+ Add Replie</span>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.stats.replies > 0 ? (
                          <>
                            <div
                              style={{
                                width: "100%",
                                //backgroundColor: "green",
                                display: "flex",
                                alignItems: "flex-end",
                                gap: 30,
                                marginBottom: 10,
                              }}
                            >
                              <div
                                className="comment-container-replies-span"
                                onClick={() => {
                                  HandleRequestReplies(
                                    item.comment.id,
                                    item.replies.length,
                                    item.stats.replies,
                                    item.replies
                                  );
                                }}
                              >
                                <PiArrowBendDownRightBold />
                                <span>Reply comment</span>
                                <span className="comment-container-replies-span-value">
                                  {item.stats.replies}
                                </span>
                              </div>
                              <div
                                className="post-content-footer-stats-item post-content-footer-stats-value "
                                style={{
                                  color: "#4096ff",
                                  cursor: "pointer",
                                }}
                                onClick={HandleOpenReplyModal}
                              >
                                <span>+ Add Replie</span>
                              </div>
                            </div>
                            {/*REPLIES*/}
                            {item.replies.length === 0 ? (
                              <>
                                {loadingReplies.comment_id ===
                                  item.comment.id &&
                                loadingReplies.loading === true ? (
                                  <div className="comment-replie-loading-container">
                                    <Spin
                                      //size="large"
                                      indicator={<LoadingOutlined spin />}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <>
                                {item.replies.map((replie, index) => (
                                  <>
                                    {RenderReplies(
                                      replie,
                                      index,
                                      item.replies.length,
                                      item.comment.id,
                                      item.replies.length,
                                      item.stats.replies,
                                      item.replies
                                    )}
                                  </>
                                ))}
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                  {stats.totalComments === comments.length ? (
                    <></>
                  ) : (
                    <>
                      {loadingMoreComments === true ? (
                        <div className="comment-replie-loading-container">
                          <Spin
                            //size="large"
                            indicator={<LoadingOutlined spin />}
                          />
                        </div>
                      ) : (
                        <div
                          className="comment-footer-container"
                          onClick={() => {
                            setLoadingMoreComments(true);
                            HandleRequestMoreComments();
                          }}
                        >
                          <span>
                            Ver {stats.totalComments - comments.length}{" "}
                            comentarios mas
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <NewReplieModal
        isModalOpen={isReplyModalOpen}
        setIsModalOpen={setIsReplyModalOpen}
      />
      <LikesOnPostModal
        isModalOpen={isLikesModalOpen}
        setIsModalOpen={setIsLikesModalOpen}
      />
    </>
  );
};

export default PostScreen;
