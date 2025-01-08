import { Avatar, Button, ConfigProvider, Input, Switch } from "antd";
import React, { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { setLogged } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { selectFollowingFeed, selectForYouFeed } from "../../slice/feedSlice";
import FeedForYou from "./Feed/FeedForYou";
import FeedFollowing from "./Feed/FeedFollowing";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import RecomendationAcountsCard from "../../components/PrivateComponents/Home/RecomendationAcountsCard";
import ProfileCard from "../../components/PrivateComponents/Home/ProfileCard";
import NewPostModal from "../../components/PrivateComponents/Post/NewPostModal";
import ScrollDetector from "../../components/PrivateComponents/Feed/ScrollDetector";
import EditProfileModal from "../../components/PrivateComponents/Profile/EditProfileModal";
import AntdSecondaryBtnComponent from "../../components/BasicComponents/AntdSecondaryBtnComponent";
import AntdPrimaryBtnComponent from "../../components/BasicComponents/AntdPrimaryBtnComponent";
import { users_recomendation_1 } from "../../../tester_data";

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    toggleTheme();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderForYouFeed = useSelector(
    (state) => state.feedSlice.renderForYouFeed
  );

  const renderFollowingFeed = useSelector(
    (state) => state.feedSlice.renderFollowingFeed
  );

  const renderFeedType = () => {
    if (renderForYouFeed === true) {
      return <FeedForYou />;
    }
    if (renderFollowingFeed === true) {
      return <FeedFollowing />;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="home-screen-private-container">
        <div className="home-screen-feed">
          <div className="new-post-icon-container" onClick={showModal}>
            +
          </div>
          <ScrollDetector>
            <div className="home-screen-feed-type-container">
              <div
                className="home-screen-feed-type-item home-screen-feed-type-item-hover"
                onClick={() => {
                  dispatch(selectFollowingFeed());
                }}
              >
                <div
                  className={`home-screen-feed-type-item-span-container ${
                    renderFollowingFeed === true
                      ? "home-screen-feed-type-item-span-container-cta"
                      : ""
                  }`}
                >
                  Siguiendo
                </div>
              </div>
              <div
                className="home-screen-feed-type-item home-screen-feed-type-item-hover"
                onClick={() => {
                  dispatch(selectForYouFeed());
                }}
              >
                <div
                  className={`home-screen-feed-type-item-span-container ${
                    renderForYouFeed === true
                      ? "home-screen-feed-type-item-span-container-cta"
                      : ""
                  }`}
                >
                  Para ti
                </div>
              </div>
            </div>
            <div
              style={{ width: "100%" }}
              className="home-screen-feed-content-container"
            >
              {renderFeedType()}
            </div>
          </ScrollDetector>
        </div>
        <div className="layout-private-aside">
          <ProfileCard />
          <RecomendationAcountsCard users={users_recomendation_1} />
        </div>
      </div>
      <NewPostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
      />
    </>
  );
};

export default HomeScreen;
