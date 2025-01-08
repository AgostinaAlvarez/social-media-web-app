import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Avatar, Button, ConfigProvider, Modal, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import AntdSecondaryBtnComponent from "../../BasicComponents/AntdSecondaryBtnComponent";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";

const LikesOnPostModal = ({
  isModalOpen,
  setIsModalOpen,
  handleOk,
  users_data,
}) => {
  const { theme } = useTheme();
  const limit = 2;

  const initalState = users_data.slice(0, 6);
  const [users, setUsers] = useState(initalState);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);

  const handleCancel = () => {
    setUsers(initalState);
    setIsModalOpen(false);
  };

  const handleLoadingMoreUsers = (limit, users) => {
    setLoadingMoreUsers(true);
    const current_users_list_lenght = users.length;
    const nextUsers = users_data.slice(
      current_users_list_lenght,
      current_users_list_lenght + limit
    );
    const upldateList = [...users, ...nextUsers];

    setTimeout(() => {
      setLoadingMoreUsers(false);
      setUsers(upldateList);
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
        title="Likes"
        width={430}
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {users.map((item) => (
            <div className="recomendation-acounts-card-acount-container">
              <div className="recomendation-acounts-card-acount-info">
                <Avatar icon={<UserOutlined />} />
                <div className="recomendation-acounts-card-acount-name-container">
                  <span className="recomendation-acounts-card-acount-username">
                    {item.name} {item.lastname}
                  </span>
                  <span>@{item.username}</span>
                </div>
              </div>
              <>
                {item.following ? (
                  <AntdSecondaryBtnComponent label="Following" theme={theme} />
                ) : (
                  <AntdPrimaryBtnComponent label="Follow" theme={theme} />
                )}
              </>
            </div>
          ))}
          {loadingMoreUsers ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: "10px 0px",
              }}
            >
              <Spin
                //size="large"
                indicator={<LoadingOutlined spin />}
              />
            </div>
          ) : (
            <span
              onClick={() => {
                handleLoadingMoreUsers(limit, users);
              }}
              className="recomendation-acounts-card-show-more"
            >
              Show more
            </span>
          )}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default LikesOnPostModal;
