import { Avatar, Button, ConfigProvider, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import "../../../styles/newMessageModal.css";
import axios from "axios";
import UserItem from "../User/UserItem";
import { CloseOutlined } from "@ant-design/icons";

const NewMessageModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  loading,
  setLoading,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8002/user/search",
            {
              query,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data.users);
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error al buscar usuarios", error);
        }
      };

      searchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const selectUser = (userData) => {
    console.log(userData);
    setSelectedUser(userData);
  };

  const resetData = () => {
    setLoading(false);
    setUsers([]);
    setSelectedUser(null);
    setQuery("");
  };

  return (
    <>
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
          title="Nuevo Mensaje"
          open={isModalOpen}
          /*
          onOk={() => {
            handleOk(selectedUser);
          }}
          */
          onCancel={() => {
            resetData();
            handleCancel();
          }}
          footer={[
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    borderColorDisabled:
                      theme === "dark" ? "#244a6d" : "#bfe0fc",
                  },
                },
                token: {
                  colorBgContainerDisabled:
                    theme === "dark" ? "#244a6d" : "#bfe0fc",
                  colorTextDisabled: theme === "dark" ? "#4b5e6f" : "#e0f0fe",
                },
              }}
            >
              <Button
                loading={loading ? true : false}
                disabled={!selectedUser ? true : false}
                key="submit"
                type="primary"
                style={{ width: "100%", height: 42 }}
                onClick={() => {
                  handleOk(selectedUser, resetData);
                }}
              >
                Chat
              </Button>
            </ConfigProvider>,
          ]}
        >
          {!selectedUser ? (
            <div className="new-message-modal-search-user-container">
              <div className="new-message-modal-search-user-input">
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder:
                        theme === "dark"
                          ? "rgb(189, 189, 189)"
                          : "rgb(99, 99, 99)",
                      colorBgContainer:
                        theme === "dark"
                          ? "rgba(54,54,54,255)"
                          : "rgba(239,239,239,255)",
                    },
                  }}
                >
                  <Input
                    style={{
                      border: "none",
                      boxShadow: "none",
                      color: theme === "dark" ? "white" : "black",
                      padding: "7px 10px",
                    }}
                    placeholder="Para..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </ConfigProvider>
              </div>
              <div className="new-message-modal-search-user-list">
                {users.map((item) => (
                  <UserItem userData={item} onSelectUser={selectUser} />
                ))}
              </div>
            </div>
          ) : (
            <div className="new-message-modal-search-user-container">
              <span>Para:</span>
              <div className="new-message-modal-user-selected-container ">
                <div
                  className="new-message-modal-user-selected-quit-icon"
                  onClick={() => {
                    console.log("quitar");
                    resetData();
                  }}
                >
                  <Avatar size={25} icon={<CloseOutlined />} />
                </div>
                <UserItem userData={selectedUser} onSelectUser={null} />
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default NewMessageModal;
