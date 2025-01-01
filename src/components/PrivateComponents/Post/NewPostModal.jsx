import { Avatar, Button, ConfigProvider, Dropdown, Modal } from "antd";
import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import "../../../styles/newPostModal.css";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { MdInsertEmoticon } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { clasificateNewPost, createNewPost } from "../../../data/api/postApi";

const NewPostModal = ({ isModalOpen, setIsModalOpen, handleOk }) => {
  const { theme, toggleTheme } = useTheme();
  const token = useSelector((state) => state.authSlice.token);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setValue("");
    setIsModalOpen(false);
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

  const HandleNewPost = async () => {
    setLoading(true);
    //const date = new Date();
    //const createdAt = date.toISOString();
    //aaaa-mm-dd
    const createdAt = "2024-10-20T18:09:45.511Z";
    const data = {
      content: value,
      imageUrl: null,
      createdAt,
    };

    const { data: response, error } = await createNewPost(token, data);

    if (response) {
      console.log("salio bien la creacion del post");
      console.log(response);
      const new_post = response.data.new_post;
      //hacer la clasificacion
      const data = {
        postId: new_post._id,
        date: new_post.createdAt,
      };
      console.log("data que voy a mandar");
      console.log(data);
      HandleClasificateNewPost(data);
    } else {
      console.log("error al crear el post");
      console.log(error);
    }
  };

  const HandleClasificateNewPost = async (data) => {
    const { data: response, error } = await clasificateNewPost(token, data);
    if (response) {
      console.log("salio bien la clasificacion del post");
      console.log(response);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setTimeout(() => {
        setIsModalOpen(false);
        setValue("");
      }, 2000);
    } else {
      console.log("error al clasificar el post");
      console.log(error);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setTimeout(() => {
        setIsModalOpen(false);
        setValue("");
      }, 2000);
    }
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
        title=""
        width={600}
        style={{
          top: 25,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="new-post-footer-container">
            <div className="new-post-footer-icons-container">
              <FaRegImage />
              <Dropdown overlay={emojiPicker} trigger={["click"]}>
                <MdInsertEmoticon />
              </Dropdown>
            </div>
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
                type="primary"
                onClick={HandleNewPost}
                disabled={value.trim() === "" ? true : false}
                loading={loading ? true : false}
              >
                Post
              </Button>
            </ConfigProvider>
          </div>,
        ]}
      >
        <div className="new-post-container">
          <Avatar size={40} icon={<UserOutlined />} />
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorTextPlaceholder:
                    theme === "dark" ? "#e6e6e640" : "#00000040",
                  colorTextTertiary:
                    theme === "dark" ? "#e6e6e640" : "#00000040",
                },
              }}
            >
              <TextArea
                placeholder="Whats going on..."
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                variant="borderless"
                //maxLength={130}
                style={{
                  height: 80,
                  resize: "none",
                }}
                count={{
                  show: true,
                  max: 130,
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default NewPostModal;
