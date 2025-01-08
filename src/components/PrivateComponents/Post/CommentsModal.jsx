import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import "../../../styles/postComponent.css";
import { UserOutlined } from "@ant-design/icons";
import { FaRegImage } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";
import {
  HandleRequestMoreComments,
  HandleRequestMoreReplies,
} from "../../../data/functions/postsFunctions";
import { comments_data, replies } from "../../../../tester_data";

const CommentsModal = ({
  isModalOpen,
  setIsModalOpen,
  loadingCommentData,
  commentsInitialState,
}) => {
  const { theme } = useTheme();
  const stats = {
    totalComments: 8,
  };
  const limit = 2;

  const [comments, setComments] = useState([]);

  const [loadingMoreComments, setLoadingMoreComments] = useState(false);

  const [loadingReplies, setLoadingReplies] = useState({
    comment_id: null,
    loading: false,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setComments(commentsInitialState);
  }, [loadingCommentData]);

  const HandleReplies = (current_replies_lenght, comment_id, total_replies) => {
    if (current_replies_lenght === 0) {
      //hacer la peticion
      setLoadingReplies({
        comment_id: comment_id,
        loading: true,
      });
      console.log("pedir replies");

      const updateReplies = HandleRequestMoreReplies(
        comment_id,
        current_replies_lenght,
        total_replies,
        [],
        limit,
        replies
      );

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
        setLoadingReplies({
          comment_id: null,
          loading: false,
        });
        setComments(updateComments);
      }, 2000);
      //HandleRequestMoreReplies(comment_id);
    }
  };

  const MoreRepliesComponent = (
    index,
    current_replies_lenght,
    total_replies
  ) => {
    if (
      index + 1 === current_replies_lenght &&
      current_replies_lenght !== total_replies
    ) {
      return true;
    } else {
      return false;
    }
  };

  const HandleRequestReplies = (
    comment_id,
    current_replies_lenght,
    total_replies,
    current_replies,
    limit
  ) => {
    setLoadingReplies({
      comment_id: comment_id,
      loading: true,
    });

    const updateReplies = HandleRequestMoreReplies(
      comment_id,
      current_replies_lenght,
      total_replies,
      current_replies,
      limit,
      replies
    );

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
      setLoadingReplies({
        comment_id: null,
        loading: false,
      });
      setComments(updateComments);
    }, 2000);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: theme === "dark" ? "#262626" : "#ffffff",
            headerBg: theme === "dark" ? "#262626" : "#ffffff",
          },
        },
        token: {
          colorText: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
          colorIcon: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
        },
      }}
    >
      <Modal
        title="Drafts"
        style={{
          top: 25,
        }}
        width={700}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/*post*/}
          <div className="comment-container replie-container">
            <Avatar icon={<UserOutlined />} size={40} />
            <div className="comment-container-info-box">
              <div
                className="post-header-user-data-name"
                style={{ fontSize: 14 }}
              >
                <span className="info-name-lbl">User Name</span>
                <span className="info-username-lbl">@username</span>
                <span className="info-date-lbl" style={{ fontSize: 12 }}>
                  | Wednesday, Oct 16, 6:02 PM
                </span>
              </div>

              <p className="comment-container-info-box-p">
                The Alchemist by Paulo Coelho. It taught me to trust my journey
                and never give up.
              </p>
            </div>
          </div>
          {/*Comment section*/}
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/*Input*/}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 10,
                }}
              >
                <Avatar icon={<UserOutlined />} />
                <TextArea
                  placeholder="add a comment"
                  variant="borderless"
                  style={{
                    height: 80,
                    resize: "none",
                  }}
                  count={{
                    show: true,
                    max: 130,
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  boxSizing: "border-box",
                  gap: 20,
                  marginTop: 10,
                  padding: "10px 0px",
                }}
              >
                <div className="new-post-footer-icons-container">
                  <FaRegImage />
                  <MdInsertEmoticon />
                </div>
                <Button type="primary">Add Comment</Button>
              </div>
            </div>
            {/*coments list*/}
            <div className="comment-list">
              <>
                {/*a coment*/}
                <Divider />
                <span className="info-name-lbl">Comments</span>
                {loadingCommentData ? (
                  <div
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 0px",
                    }}
                  >
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
                ) : (
                  <>
                    {comments.map((item) => (
                      <div
                        className="comment-container"
                        style={{ border: "none" }}
                      >
                        <Avatar icon={<UserOutlined />} />
                        <div className="comment-container-info-box">
                          <div
                            className="post-header-user-data-name"
                            style={{ alignItems: "flex-end" }}
                          >
                            <span className="info-name-lbl">User name</span>
                            <span className="info-username-lbl">@username</span>
                            <span
                              className="info-date-lbl"
                              style={{ fontSize: "11px" }}
                            >
                              - Wednesday, Oct 16, 6:02 PM
                            </span>
                          </div>
                          <p
                            className="comment-container-info-box-p"
                            style={{ margin: "0px" }}
                          >
                            contenido del comentario
                          </p>

                          <div
                            style={{
                              width: "100%",
                              boxSizing: "border-box",
                              paddingTop: 7,
                            }}
                          >
                            <div className="post-content-input-container">
                              <Avatar icon={<UserOutlined />} />
                              <div className="post-content-input-box">
                                <Input
                                  variant="borderless"
                                  placeholder="reply to @username..."
                                />
                                <div className="post-content-input-box-icons-container">
                                  <FaRegImage />
                                  <MdInsertEmoticon />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*Reply footer*/}
                          {item.stats.replies !== 0 && (
                            <>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: 30,
                                  marginBottom: 10,
                                  backgroundColor: "pink",
                                }}
                              >
                                <div
                                  className="comment-container-replies-span"
                                  style={{ alignItems: "center" }}
                                  onClick={() => {
                                    HandleReplies(
                                      item.replies.length,
                                      item.comment.id,
                                      item.stats.replies
                                    );
                                  }}
                                >
                                  <PiArrowBendDownRightBold />
                                  <span>Reply comment</span>
                                  <span className="comment-container-replies-span-value">
                                    {item.stats.replies}
                                  </span>
                                </div>
                              </div>
                              {item.replies.length === 0 ? (
                                <>
                                  {/*Prevee la situacion de pedir comentarios por primera vez*/}
                                  {loadingReplies.comment_id ===
                                    item.comment.id &&
                                  loadingReplies.loading === true ? (
                                    <div>
                                      <Spin
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
                                    <div
                                      className="comment-container"
                                      style={{ border: "none" }}
                                    >
                                      <Avatar icon={<UserOutlined />} />
                                      <div className="comment-container-info-box">
                                        <div
                                          className="post-header-user-data-name"
                                          style={{ alignItems: "flex-end" }}
                                        >
                                          <span className="info-name-lbl">
                                            User nameee
                                          </span>
                                          <span className="info-username-lbl">
                                            @username
                                          </span>
                                          <span
                                            className="info-date-lbl"
                                            style={{ fontSize: "11px" }}
                                          >
                                            - Wednesday, Oct 16, 6:02 PM
                                          </span>
                                        </div>
                                        <p
                                          className="comment-container-info-box-p"
                                          style={{ margin: "0px" }}
                                        >
                                          contenido del comentario
                                        </p>
                                        {/*
                                          <div>index+1 {index + 1}</div>
                                          <div>
                                            Total items current{" "}
                                            {item.replies.length}
                                          </div>
                                          <div>
                                            Total replies {item.stats.replies}
                                          </div>
                                          
                                          */}
                                        {MoreRepliesComponent(
                                          index,
                                          item.replies.length,
                                          item.stats.replies
                                        ) === true ? (
                                          <>
                                            {loadingReplies.comment_id ===
                                              item.comment.id &&
                                            loadingReplies.loading === true ? (
                                              <div>
                                                <Spin
                                                  indicator={
                                                    <LoadingOutlined spin />
                                                  }
                                                />
                                              </div>
                                            ) : (
                                              <div
                                                className="comment-container-replies-span"
                                                style={{ alignItems: "center" }}
                                                onClick={() => {
                                                  HandleRequestReplies(
                                                    item.comment.id,
                                                    item.replies.length,
                                                    item.stats.replies,
                                                    item.replies,
                                                    2
                                                  );
                                                }}
                                              >
                                                <PiArrowBendDownRightBold />
                                                <span>
                                                  View more{" "}
                                                  {item.stats.replies -
                                                    item.replies.length}{" "}
                                                  replies
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        {/*
                                          <div
                                            className="comment-container-replies-span"
                                            style={{ alignItems: "center" }}
                                          >
                                            <PiArrowBendDownRightBold />
                                            <span>View 3 more replies</span>
                                          </div>
                                          
                                          */}
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          )}

                          <></>
                        </div>
                      </div>
                    ))}
                    {stats.totalComments !== 0 && (
                      <>
                        {stats.totalComments !== comments.length && (
                          <>
                            {loadingMoreComments === true ? (
                              <div>
                                <Spin indicator={<LoadingOutlined spin />} />
                              </div>
                            ) : (
                              <div>
                                <span
                                  onClick={() => {
                                    setLoadingMoreComments(true);
                                    const response = HandleRequestMoreComments(
                                      comments,
                                      stats,
                                      comments_data,
                                      limit
                                    );
                                    setTimeout(() => {
                                      setComments(response);
                                      setLoadingMoreComments(false);
                                    }, 2000);
                                  }}
                                >
                                  Ver {stats.totalComments - comments.length}{" "}
                                  comentarios mas
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default CommentsModal;
