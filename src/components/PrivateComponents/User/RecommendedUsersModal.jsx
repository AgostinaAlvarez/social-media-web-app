import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Avatar, Button, ConfigProvider, Modal, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const RecommendedUsersModal = ({ isModalOpen, setIsModalOpen, handleOk }) => {
  const { theme } = useTheme();

  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);

  const handleCancel = () => {
    setUsers(users_tester);
    setIsModalOpen(false);
  };

  const handleLoadingMoreUsers = () => {
    setLoadingMoreUsers(true);
    setTimeout(() => {
      setLoadingMoreUsers(false);
      setUsers((prevUsers) => [...prevUsers, ...users_tester]);
    }, 3000);
  };

  const users_tester = [
    {
      username: "shirobladeX",
      name: "Shiro",
      lastname: "Blade",
      avatar: "",
      id: "1",
    },
    {
      username: "JuventusKing",
      name: "Fabio",
      lastname: "Ricci",
      avatar: "",
      id: "2",
    },
    {
      username: "FestivalFever_90",
      name: "Laura",
      lastname: "Martínez",
      avatar: "",
      id: "3",
    },
  ];

  const [users, setUsers] = useState(users_tester);

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
        title="Recomended Users"
        width={400}
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
              <Button type="primary">Follow</Button>
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
              onClick={handleLoadingMoreUsers}
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

export default RecommendedUsersModal;
