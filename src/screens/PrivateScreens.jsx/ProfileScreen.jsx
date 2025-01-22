import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecomendationAcountsCard from "../../components/PrivateComponents/Home/RecomendationAcountsCard";
import { Avatar, Button, Image, Spin } from "antd";
import ProfileStatsCard from "../../components/PrivateComponents/Profile/ProfileStatsCard";
import NewPostModal from "../../components/PrivateComponents/Post/NewPostModal";
import "../../styles/postComponent.css";
import { UserOutlined } from "@ant-design/icons";
import { BsThreeDots } from "react-icons/bs";
import { postDateTranform } from "../../data/utils/dates";
import { LoadingOutlined } from "@ant-design/icons";
import EditProfileModal from "../../components/PrivateComponents/Profile/EditProfileModal";
import {
  followers_1,
  following_1,
  users_recomendation_2,
} from "../../../tester_data";
import FollowingModal from "../../components/PrivateComponents/Stats/FollowingModal";
import FollowersModal from "../../components/PrivateComponents/Stats/FollowersModal";
import { PostFeedCard } from "../../components/PrivateComponents/Post/PostCard";
import { useImageCrop } from "../../context/ImageCropContext";
import { initializeProfileState } from "../../slice/editProfileSlice";

const ProfileScreen = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const posts = useSelector((state) => state.postsSlice.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("posts");
    //console.log(posts);
  }, []);

  const { setCroppedImageFrontPage, setCroppedImageAvatar } = useImageCrop();
  const setValues = () => {
    setCroppedImageFrontPage(userData.front_page_img);
    setCroppedImageAvatar(userData.avatar_img);
  };

  //EDIT PROFILE MODAL
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const showEditProfileModal = () => {
    dispatch(initializeProfileState(userData));
    setValues();
    setIsEditProfileModalOpen(true);

    /*
     */
  };
  const handleOkEditProfile = () => {
    setIsEditProfileModalOpen(false);
  };

  ///NEW POST MODAL
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const showNewPostModal = () => {
    setIsNewPostModalOpen(true);
  };
  const handleOkNewPost = () => {
    setIsNewPostModalOpen(false);
  };

  //FOLLOWING MODAL
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const showFollowingModal = () => {
    setIsFollowingModalOpen(true);
  };

  //FOLLOWERS MODAL
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const showFollowersModal = () => {
    setIsFollowersModalOpen(true);
  };

  const data_posts = [
    {
      post: {
        id: "6772c6c075bc0944b24f2245",
        content:
          "Finally got my hands on a mechanical keyboard, and wow, typing feels like a whole new experience. Anyone else obsessed with these?",
        createdAt: "2024-12-28T22:05:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
    {
      post: {
        id: "6772c6c075bc0944b24f2246",
        content:
          "Spent the afternoon debugging a single line of code, only to realize I forgot a semicolon. Programmers, you feel me?",
        createdAt: "2024-12-27T19:19:21.511000",
      },
      stats: {
        likes: 57,
        comments: 39,
        saves: 40,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
    {
      post: {
        id: "6772c6c075bc0944b24f2246",
        content:
          "Imagine if someone made a movie about programmers but showed the actual work—just endless coffee, Stack Overflow, and staring at screens.",
        createdAt: "2024-10-16T18:02:30.511000",
      },
      stats: {
        likes: 57,
        comments: 39,
        saves: 40,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
  ];

  const transform_data_posts = data_posts.map((item) => {
    return {
      ...item,
      user: { ...userData, avatar: userData.avatar_img },
    };
  });

  const [testerPosts, setTesterPosts] = useState(transform_data_posts);

  return (
    <>
      <div className="home-screen-private-container">
        <div className="home-screen-feed">
          <div className="user-screen">
            {/*Header */}
            <div
              className="user-screen-header"
              style={
                userData.front_page_img === ""
                  ? { backgroundColor: "red" }
                  : {
                      backgroundImage: `url(${userData.front_page_img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
              }
            >
              <div
                className="user-screen-profile-image"
                style={{ overflow: "hidden" }}
              >
                {userData.avatar_img === "" ? (
                  <></>
                ) : (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    src={userData.avatar_img}
                  />
                )}
              </div>
            </div>
            {/*Informacion del usuario*/}
            <div className="user-screen-info-container">
              <div className="user-screen-info-box">
                <span className="user-screen-info-box-name">
                  {userData.name} {userData.lastname}
                </span>
                <span className="info-username-lbl">@{userData.username}</span>
                <p className="user-screen-info-box-description">
                  {userData.description}
                </p>
                <div className="user-screen-info-box-data-container">
                  <div
                    className="user-screen-info-box-data"
                    onClick={showFollowersModal}
                  >
                    <span className="user-screen-info-box-data-value">294</span>
                    <span className="user-screen-info-box-data-label">
                      Followers
                    </span>
                  </div>
                  <div
                    className="user-screen-info-box-data"
                    onClick={showFollowingModal}
                  >
                    <span className="user-screen-info-box-data-value">276</span>
                    <span className="user-screen-info-box-data-label">
                      Following
                    </span>
                  </div>
                  <div className="user-screen-info-box-data">
                    <span className="user-screen-info-box-data-value">20</span>
                    <span className="user-screen-info-box-data-label">
                      Posts
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Button type="primary" onClick={showEditProfileModal}>
                  Edit Profile
                </Button>
              </div>
            </div>
            {/*Content*/}
            <div className="post-list-container">
              {/*Posts*/}
              {testerPosts.map((item, index) => (
                <PostFeedCard
                  item={item}
                  index={index}
                  HandleSelect={() => {
                    console.log("select");
                  }}
                  HandleOpenCommentsModal={() => {
                    console.log("handle open comments");
                  }}
                  HandleOpenLikesModal={() => {
                    console.log("handle open likes");
                  }}
                  stats={item.stats}
                />
              ))}
              {/*posts.length > 0 && (
                <>
                  {posts.map((item) => (
                    <div className="post-container" key={item._id}>
                      <div className="post-header">
                        <div className="post-header-user-data-container">
                          <Avatar icon={<UserOutlined />} />
                          <div className="post-header-user-data">
                            <div className="post-header-user-data-name">
                              <span>User Name</span>
                              <span>@username</span>
                            </div>
                            <span className="post-header-date">
                              {postDateTranform(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <BsThreeDots />
                      </div>
                      <p className="post-content">{item.content}</p>
                    </div>
                  ))}
                </>
                  )*/}
              {/*
                <div className="posts-spin-container">
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
                
                */}
            </div>
          </div>
          {/*New Post Icon*/}
          <div className="new-post-icon-container" onClick={showNewPostModal}>
            +
          </div>
        </div>

        <div className="layout-private-aside">
          <ProfileStatsCard />
          <RecomendationAcountsCard users={users_recomendation_2} />
        </div>
      </div>
      <NewPostModal
        isModalOpen={isNewPostModalOpen}
        setIsModalOpen={setIsNewPostModalOpen}
        handleOk={handleOkNewPost}
      />
      <EditProfileModal
        isModalOpen={isEditProfileModalOpen}
        setIsModalOpen={setIsEditProfileModalOpen}
      />
      <FollowingModal
        isModalOpen={isFollowingModalOpen}
        setIsModalOpen={setIsFollowingModalOpen}
        users_tester={following_1}
      />
      <FollowersModal
        isModalOpen={isFollowersModalOpen}
        setIsModalOpen={setIsFollowersModalOpen}
        users_tester={followers_1}
      />
    </>
  );
};

export default ProfileScreen;
