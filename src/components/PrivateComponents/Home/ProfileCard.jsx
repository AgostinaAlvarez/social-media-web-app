import React, { useState } from "react";
import { Avatar, Button, ConfigProvider, Dropdown, Space } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../context/ThemeContext";
import {
  SettingOutlined,
  MoonOutlined,
  UserOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../Profile/EditProfileModal";
import { initializeProfileState } from "../../../slice/editProfileSlice";
import { useImageCrop } from "../../../context/ImageCropContext";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";

const ProfileCard = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userSlice.userData);
  const dispatch = useDispatch();

  const theme_config_provider = {
    token: {
      colorBgBase: theme === "dark" ? "#262626" : "#ffffff", // Fondo base
      controlItemBgHover: theme === "dark" ? "#414141" : "rgba(0, 0, 0, 0.04)",
      colorText: theme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.88)",
    },
  };

  const item_style = {
    padding: "18px 10px",
    color: theme === "dark" ? "white" : "black",
    fontWeight: "500",
  };

  const HandleChangeAspect = () => {
    setTimeout(() => {
      toggleTheme();
    }, 500);
  };

  const HandleSelectConfigurations = () => {
    console.log("configuraciones");
    showModal();
  };

  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
    if (key === "1") {
      HandleSelectConfigurations();
    }
    if (key === "2") {
      HandleChangeAspect();
    }
  };

  const items = [
    {
      key: "1",
      icon: <SettingOutlined />,
      label: "Configuracion",
      style: item_style,
    },
    {
      key: "2",
      icon: theme === "dark" ? <SunOutlined /> : <MoonOutlined />,
      label: "Cambiar aspecto",
      style: item_style,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setCroppedImageFrontPage, setCroppedImageAvatar } = useImageCrop();

  const setValues = () => {
    setCroppedImageFrontPage(userData.front_page_img);
    setCroppedImageAvatar(userData.avatar_img);
  };

  const showModal = () => {
    dispatch(initializeProfileState(userData));
    setValues();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-config">
          <ConfigProvider theme={theme_config_provider}>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
              overlayStyle={{ width: "230px" }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <BsThreeDots />
              </a>
            </Dropdown>
          </ConfigProvider>
        </div>
        <Avatar
          size={70}
          //icon={<UserOutlined />}
          src={userData.avatar_img === "" ? undefined : userData.avatar_img}
        >
          {userData.avatar_img === "" ? <span>A</span> : <></>}
        </Avatar>
        <div
          className="profile-card-user-name-container"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <span className="profile-card-username-strong">
            {userData.name} {userData.lastname}
          </span>
          <span>@{userData.username}</span>
        </div>
        <div className="profile-card-stats-container ">
          <div className="profile-card-stats-data-container">
            <span className="profile-card-stats-value">20</span>
            <span>Following</span>
          </div>
          <div className="profile-card-stats-data-container">
            <span className="profile-card-stats-value">25</span>
            <span>Followers</span>
          </div>
        </div>

        {/*
          <AntdSecondaryBtnComponent
            theme={theme}
            onClick={showModal}
            label={"Edit profile"}
            style={{ width: "100%" }}
          />
          */}
      </div>
      <EditProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ProfileCard;
