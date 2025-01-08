import { Avatar, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { postDateTranform } from "../../../data/utils/dates";
import SkeletonPostFeed from "../../../components/PrivateComponents/Skeletons/SkeletonPostFeed";
import { useNavigate } from "react-router-dom";
import LikesOnPostModal from "../../../components/PrivateComponents/Post/LikesOnPostModal";
import CommentsModal from "../../../components/PrivateComponents/Post/CommentsModal";
import { PostFeedCard } from "../../../components/PrivateComponents/Post/PostCard";
import { HandleRequestMoreComments } from "../../../data/functions/postsFunctions";
import {
  comments_data,
  likes_1,
  tester_feed_for_you,
} from "../../../../tester_data";
import { useSelector } from "react-redux";

const FeedForYou = () => {
  const navigate = useNavigate();
  const skeleton_render = Array(10).fill(null);

  const loadingFeedForYou = useSelector(
    (state) => state.feedSlice.loadingFeedForYou
  );
  const feedForYouPosts = useSelector(
    (state) => state.feedSlice.feedForYouPosts
  );

  const loadingMoreFeedForYouPost = useSelector(
    (state) => state.feedSlice.loadingMoreFeedForYouPost
  );

  //LIKES MODAL
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  const HandleOpenLikesModal = () => {
    setIsLikesModalOpen(true);
  };
  //COMMENT MODAL
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [loadingCommentData, setLoadingCommentData] = useState(true);
  const HandleOpenCommentsModal = () => {
    setLoadingCommentData(true);
    setIsCommentsModalOpen(true);
    HandleDataOnCommentModal();
  };
  const [commentsInitialState, setCommentsInitialState] = useState([]);
  const HandleDataOnCommentModal = () => {
    console.log("pedir la data de los comentarios");
    setCommentsInitialState([]);
    const stats = {
      totalComments: 8,
    };

    const comments = HandleRequestMoreComments([], stats, comments_data, 2);
    console.log("comentarios");
    setCommentsInitialState(comments);
    setTimeout(() => {
      setLoadingCommentData(false);
    }, 3000);
  };

  //SELECT POST
  const HandleSelectPost = () => {
    navigate("/post");
  };

  return (
    <>
      <div className="feed-for-you-container">
        {loadingFeedForYou === true ? (
          skeleton_render.map((_, index) => <SkeletonPostFeed />)
        ) : (
          <>
            {feedForYouPosts.map((item, index) => (
              <PostFeedCard
                index={index}
                item={item}
                HandleSelect={HandleSelectPost}
                HandleOpenCommentsModal={HandleOpenCommentsModal}
                HandleOpenLikesModal={HandleOpenLikesModal}
                stats={item.stats}
              />
            ))}
          </>
        )}
      </div>
      <LikesOnPostModal
        isModalOpen={isLikesModalOpen}
        setIsModalOpen={setIsLikesModalOpen}
        users_data={likes_1}
      />
      <CommentsModal
        isModalOpen={isCommentsModalOpen}
        setIsModalOpen={setIsCommentsModalOpen}
        loadingCommentData={loadingCommentData}
        commentsInitialState={commentsInitialState}
        //setLoadingCommentData={setLoadingCommentData}
      />
    </>
  );
};

export default FeedForYou;
