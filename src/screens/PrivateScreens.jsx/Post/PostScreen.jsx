import { Avatar, Dropdown, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import "../../../styles/postComponent.css";
import { FaRegImage } from "react-icons/fa6";
import { MdInsertEmoticon } from "react-icons/md";
import { comments_data, likes_1, replies } from "../../../../tester_data";
import { LoadingOutlined } from "@ant-design/icons";
import NewReplieModal from "../../../components/PrivateComponents/Post/NewReplieModal";
import LikesOnPostModal from "../../../components/PrivateComponents/Post/LikesOnPostModal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "../../../context/ThemeContext";
import { PostNewCommentModal } from "../../../components/PrivateComponents/Post/PostCard";
import { CommentCardPostDetail } from "../../../components/PrivateComponents/Post/CommentCard";
import { ReplyCardPostDetail } from "../../../components/PrivateComponents/Post/ReplyCard";

const PostScreen = () => {
  const { theme } = useTheme();

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

  const emojiPicker = () => {
    return (
      <Picker
        data={data}
        onEmojiSelect={(emoji) => {
          //console.log(emoji.native);
          setValue((prevValue) => prevValue + emoji.native);
        }}
        theme={theme}
      />
    );
  };

  const [value, setValue] = useState("");

  const HandleNewComment = (e) => {
    //console.log(e.target.value);
    console.log("value");
    console.log(value);
  };

  return (
    <>
      <div className="post-screen">
        <div className="post-screen-container">
          <PostNewCommentModal
            totalComments={stats.totalComments}
            HandleOpenLikesModal={HandleOpenLikesModal}
          />
          {/*Comments*/}
          <div className="post-content-container">
            <div className="post-content-input-container">
              <Avatar icon={<UserOutlined />} />
              <div className="post-content-input-box">
                <Input
                  style={{ width: "100%", height: "30px" }}
                  disabled={loading}
                  placeholder="Basic usage"
                  variant="borderless"
                  showCount
                  maxLength={120}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  onPressEnter={HandleNewComment}
                />
                <div className="post-content-input-box-icons-container">
                  <FaRegImage />
                  <Dropdown overlay={emojiPicker} trigger={["click"]}>
                    <MdInsertEmoticon />
                  </Dropdown>
                </div>
              </div>
            </div>
            {/*Lista de comentarios*/}
            {loading === true ? (
              <div className="comment-replie-loading-container">
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
            ) : (
              <>
                <div className="comment-list">
                  {comments.map((item) => (
                    <CommentCardPostDetail
                      item={item}
                      HandleOpenReplyModal={HandleOpenReplyModal}
                      HandleRequestReplies={HandleRequestReplies}
                    >
                      <>
                        {item.replies.length === 0 ? (
                          <>
                            {loadingReplies.comment_id === item.comment.id &&
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
                                <ReplyCardPostDetail
                                  replie={replie}
                                  index={index}
                                  replies_lenght={item.replies.length}
                                  comment_id={item.comment.id}
                                  current_replies_lenght={item.replies.length}
                                  total_replies={item.stats.replies}
                                  current_replies={item.replies}
                                  HandleRequestMoreReplies={
                                    HandleRequestMoreReplies
                                  }
                                  loadingReplies={loadingReplies}
                                />
                              </>
                            ))}
                          </>
                        )}
                      </>
                    </CommentCardPostDetail>
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
                        <div className="comment-footer-container">
                          <span
                            onClick={() => {
                              setLoadingMoreComments(true);
                              HandleRequestMoreComments();
                            }}
                          >
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
        users_data={likes_1}
      />
    </>
  );
};

export default PostScreen;
