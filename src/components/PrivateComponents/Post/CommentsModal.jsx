import {
  Avatar,
  ConfigProvider,
  Divider,
  Image,
  Input,
  Modal,
  Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import "../../../styles/postComponent.css";
import { UserOutlined } from "@ant-design/icons";
import { FaRegImage } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { LoadingOutlined } from "@ant-design/icons";
import {
  HandleRequestMoreComments,
  HandleRequestMoreReplies,
} from "../../../data/functions/postsFunctions";
import { comments_data_modal, replies_modal } from "../../../../tester_data";
import AntdTextAreaComponent from "../../BasicComponents/AntdTextAreaComponent";
import { useDispatch, useSelector } from "react-redux";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { postDateTranform } from "../../../data/utils/dates";
import { setFeedForYouPosts } from "../../../slice/feedSlice";

const CommentsModal = ({
  isModalOpen,
  setIsModalOpen,
  loadingCommentData,
  commentsInitialState,
}) => {
  const inputRefs = useRef({}); // Creamos un objeto para almacenar las referencias
  const [inputValues, setInputValues] = useState({});

  const { theme } = useTheme();
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();

  const feedForYouPosts = useSelector(
    (state) => state.feedSlice.feedForYouPosts
  );

  const [stats, setStats] = useState({
    totalComments: 6,
  });
  const limit = 2;

  const [comments, setComments] = useState([]);

  const [loadingMoreComments, setLoadingMoreComments] = useState(false);

  const [loadingReplies, setLoadingReplies] = useState({
    comment_id: null,
    loading: false,
  });

  const handleCancel = () => {
    setStats({
      totalComments: 6,
    });
    setComments([]);
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

      const updateReplies = HandleRequestMoreReplies(
        comment_id,
        current_replies_lenght,
        total_replies,
        [],
        limit,
        replies_modal
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
      replies_modal
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

  const [loadingAddNewComment, setLoadingAddNewComment] = useState(false);
  const [query, setQuery] = useState("");

  const HandleAddComment = () => {
    setLoadingAddNewComment(true);
    const date = new Date();
    const newComment = {
      user: {
        name: userData.name,
        lastname: userData.lastname,
        username: userData.username,
        avatar: userData.avatar_img,
      },
      comment: {
        id: "a",
        createdAt: date.toISOString(),
        content: query,
      },
      stats: {
        replies: 0,
        likes: 0,
      },
      replies: [],
    };
    const updateComments = [newComment, ...comments];
    const updateFeedForYou = feedForYouPosts.map((item) => {
      if (item.post.id === "abcdefg123456hijkl7890") {
        return {
          ...item,
          stats: {
            ...item.stats,
            comments: item.stats.comments + 1,
          },
        };
      }
      return item;
    });
    dispatch(setFeedForYouPosts(updateFeedForYou));
    setQuery("");
    setTimeout(() => {
      setLoadingAddNewComment(false);
      setStats({
        totalComments: stats.totalComments + 1,
      });
      setComments(updateComments);
    }, 2000);
  };

  const [loadingAddNewReply, setLoadingAddNewReply] = useState({
    comment_id: null,
    loading: false,
  });

  const HandleAddNewReply = (commentId, value) => {
    setLoadingAddNewReply({
      comment_id: commentId,
      loading: true,
    });
    const date = new Date();

    const newReply = {
      user: {
        name: userData.name,
        lastname: userData.lastname,
        username: userData.username,
        avatar: userData.avatar_img,
      },
      reply: {
        id: "0",
        createdAt: date.toISOString(),
        content: value,
      },
    };
    const updateComments = comments.map((item) => {
      if (item.comment.id === commentId) {
        return {
          ...item,
          stats: {
            replies: item.stats.replies + 1,
          },
          replies: [newReply, ...item.replies],
        };
      }
      return item;
    });

    setTimeout(() => {
      setLoadingAddNewReply({
        comment_id: null,
        loading: false,
      });
      setComments(updateComments);
    }, 2000);
  };

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEnterPress = (id, value) => {
    if (value.trim() !== "") {
      HandleAddNewReply(id, value);
    }
    setInputValues((prev) => ({
      ...prev,
      [id]: "",
    }));
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
            <Avatar
              src="https://pbs.twimg.com/profile_images/1786906643092930561/lLsSgbF7_400x400.jpg"
              //icon={<UserOutlined />}
              size={40}
            />
            <div className="comment-container-info-box">
              <div
                className="post-header-user-data-name"
                style={{ fontSize: 14 }}
              >
                <span className="info-name-lbl">Mia Garcia</span>
                <span className="info-username-lbl">@history_tech</span>
                <span className="info-date-lbl" style={{ fontSize: 12 }}>
                  | Monday, Nov 25, 2:45 PM
                </span>
              </div>

              <p className="comment-container-info-box-p">
                The history of technology is a fascinating journey. Did you know
                that the first computer, ENIAC, weighed over 27 tons and filled
                an entire room?
              </p>
              <div
                style={{
                  width: "80%",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <Image
                  width={"100%"}
                  src={
                    "https://pbs.twimg.com/media/GOBsoufbsAAr59m?format=png&name=large"
                  }
                />
              </div>
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
                {userData.avatar_img === "" ? (
                  <Avatar size={40} icon={<UserOutlined />} />
                ) : (
                  <Avatar size={40} src={userData.avatar_img} />
                )}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span className="info-name-lbl">
                      {userData.name} {userData.lastname}
                    </span>
                    <span className="info-username-lbl">
                      @{userData.username}
                    </span>
                  </div>
                  <AntdTextAreaComponent
                    placeholder={`Add a new coment`}
                    variant={"borderless"}
                    style={{
                      height: 80,
                      resize: "none",
                    }}
                    count={{
                      show: true,
                      max: 130,
                    }}
                    theme={theme}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                </div>
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
                <AntdPrimaryBtnComponent
                  label={"Add Comment"}
                  disabled={
                    query.trim() === "" || loadingCommentData === true
                      ? true
                      : false
                  }
                  onClick={HandleAddComment}
                />
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
                    {loadingAddNewComment && (
                      <div className="comment-footer-container">
                        <Spin indicator={<LoadingOutlined spin />} />
                      </div>
                    )}
                    {comments.map((item) => (
                      <div
                        className="comment-container"
                        style={{ border: "none" }}
                      >
                        {item.user.avatar ? (
                          <Avatar src={item.user.avatar} />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )}
                        <div className="comment-container-info-box">
                          <div
                            className="post-header-user-data-name"
                            style={{ alignItems: "flex-end" }}
                          >
                            <span className="info-name-lbl">
                              {item.user.name} {item.user.lastname}
                            </span>
                            <span className="info-username-lbl">
                              @{item.user.username}
                            </span>
                            <span
                              className="info-date-lbl"
                              style={{ fontSize: "11px" }}
                            >
                              {postDateTranform(item.comment.createdAt)}
                            </span>
                          </div>
                          <p
                            className="comment-container-info-box-p"
                            style={{ margin: "0px" }}
                          >
                            {item.comment.content}
                          </p>

                          <div
                            style={{
                              width: "100%",
                              boxSizing: "border-box",
                              paddingTop: 7,
                            }}
                          >
                            <div className="post-content-input-container">
                              {userData.avatar_img === "" ? (
                                <Avatar size={36} icon={<UserOutlined />} />
                              ) : (
                                <Avatar size={36} src={userData.avatar_img} />
                              )}
                              <div className="post-content-input-box">
                                <Input
                                  variant="borderless"
                                  placeholder={`reply to @${item.user.username}...`}
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.comment.id,
                                      e.target.value
                                    )
                                  }
                                  onPressEnter={(e) =>
                                    handleEnterPress(
                                      item.comment.id,
                                      e.target.value
                                    )
                                  }
                                  value={inputValues[item.comment.id] || ""} // Establecemos el valor controlado
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
                                    <div className="comment-footer-container">
                                      <Spin
                                        indicator={<LoadingOutlined spin />}
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {loadingAddNewReply.comment_id ===
                                      item.comment.id ? (
                                        <div className="comment-footer-container">
                                          <Spin
                                            indicator={<LoadingOutlined spin />}
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {loadingAddNewReply.comment_id ===
                                    item.comment.id && (
                                    <div className="comment-footer-container">
                                      <Spin
                                        indicator={<LoadingOutlined spin />}
                                      />
                                    </div>
                                  )}
                                  {item.replies.map((replie, index) => (
                                    <div
                                      className="comment-container"
                                      style={{ border: "none" }}
                                    >
                                      {replie.user.avatar ? (
                                        <Avatar src={replie.user.avatar} />
                                      ) : (
                                        <Avatar
                                          icon={<UserOutlined />}
                                          style={{
                                            backgroundColor: replie.user.bg,
                                          }}
                                        />
                                      )}
                                      <div className="comment-container-info-box">
                                        <div
                                          className="post-header-user-data-name"
                                          style={{ alignItems: "flex-end" }}
                                        >
                                          <span className="info-name-lbl">
                                            {replie.user.name}{" "}
                                            {replie.user.lastname}
                                          </span>
                                          <span className="info-username-lbl">
                                            @{replie.user.username}
                                          </span>
                                          <span
                                            className="info-date-lbl"
                                            style={{ fontSize: "11px" }}
                                          >
                                            {postDateTranform(
                                              replie.reply.createdAt
                                            )}
                                          </span>
                                        </div>
                                        <p
                                          className="comment-container-info-box-p"
                                          style={{ margin: "0px" }}
                                        >
                                          {replie.reply.content}
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
                                              <div className="comment-footer-container">
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
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    {stats.totalComments !== 0 && (
                      <>
                        {stats.totalComments !== comments.length && (
                          <>
                            <div className="comment-footer-container">
                              {loadingMoreComments === true ? (
                                <Spin indicator={<LoadingOutlined spin />} />
                              ) : (
                                <span
                                  onClick={() => {
                                    setLoadingMoreComments(true);
                                    const response = HandleRequestMoreComments(
                                      comments,
                                      stats,
                                      comments_data_modal,
                                      limit
                                    );
                                    setTimeout(() => {
                                      setComments(response);
                                      setLoadingMoreComments(false);
                                    }, 2000);
                                  }}
                                >
                                  View {stats.totalComments - comments.length}{" "}
                                  more comments
                                </span>
                              )}
                            </div>
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
