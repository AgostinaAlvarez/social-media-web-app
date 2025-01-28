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
  const test_array = [
    {
      _id: "67924d5994d6a0aafd290728",
      username: "matthewGriffin",
      name: "Matthew",
      lastname: "Griffin",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1823799865962536960/OFhMVHbt_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "679253414db717ad2ba9e6fb",
      username: "scarlettGray",
      name: "Scarlett",
      lastname: "Gray",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1863022344026865664/rGsC2RcH_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "679258a726434e5004a36f53",
      username: "joshuaHoward",
      name: "Joshua",
      lastname: "Howard",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1450576617261215754/X_PXogRc_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "6792595e34911fc8234ac707",
      username: "natalieWard",
      name: "Natalie",
      lastname: "Ward",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1589471094276296704/ScD4jIkE_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "67925a82b0654c0cdbf54db6",
      username: "andrewCook",
      name: "Andrew",
      lastname: "Cook",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1530649060943794178/6QE0SnyC_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "67925b7a3ab4e5575409aa97",
      username: "samanthaRivera",
      name: "Samantha",
      lastname: "Rivera",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1715626776976896000/P_o_YczX_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "67925c6780f8bb349e50d0a1",
      username: "ryanRichardson",
      name: "Ryan",
      lastname: "Richardson",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1875718870641623040/EzICM6Py_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "67925cce5668f464817695e8",
      username: "zoeyGonzalez",
      name: "Zoey",
      lastname: "Gonzalez",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1788927306624368640/pghYqR2S_400x400.jpg",
      front_page_img: "",
    },
    {
      _id: "67925d4da3336219b83db2f9",
      username: "nathanBryant",
      name: "Nathan",
      lastname: "Bryant",
      avatar_img:
        "https://pbs.twimg.com/profile_images/1790831627402158080/hVFqbFwG_400x400.jpg",
      front_page_img: "",
    },
  ];
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(test_array);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers(test_array);
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
    setUsers(test_array);
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
          title="New Message"
          open={isModalOpen}
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
                    placeholder="For..."
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
              <span>For:</span>
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
