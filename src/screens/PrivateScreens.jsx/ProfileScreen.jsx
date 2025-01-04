import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const ProfileScreen = () => {
  const userData = useSelector((state) => state.userSlice.userData);
  const posts = useSelector((state) => state.postsSlice.posts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("posts");
    console.log(posts);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const showEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleOkEditProfile = () => {
    setIsEditProfileModalOpen(false);
  };

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
                <span className="user-screen-info-box-username">
                  @{userData.username}
                </span>
                <p className="user-screen-info-box-description">
                  Hola! Esta es una descripcion estandar del usuario
                </p>
                <div className="user-screen-info-box-data-container">
                  <div
                    className="user-screen-info-box-data"
                    //onClick={HandleOpenFriendModal}
                  >
                    <span className="user-screen-info-box-data-value">1</span>
                    <span className="user-screen-info-box-data-label">
                      Seguidores
                    </span>
                  </div>
                  <div className="user-screen-info-box-data">
                    <span className="user-screen-info-box-data-value">20</span>
                    <span className="user-screen-info-box-data-label">
                      Siguiendo
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
                  Editar perfil
                </Button>
              </div>
            </div>
            {/*Content*/}
            <div className="post-list-container">
              {/*Posts*/}
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
              <div className="posts-spin-container">
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
            </div>
          </div>
          {/*New Post Icon*/}
          <div className="new-post-icon-container" onClick={showModal}>
            +
          </div>
        </div>

        <div className="layout-private-aside">
          <ProfileStatsCard />
          <RecomendationAcountsCard />
        </div>
      </div>
      <NewPostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
      />
      <EditProfileModal
        isModalOpen={isEditProfileModalOpen}
        setIsModalOpen={setIsEditProfileModalOpen}
      />
    </>
  );
};

export default ProfileScreen;
