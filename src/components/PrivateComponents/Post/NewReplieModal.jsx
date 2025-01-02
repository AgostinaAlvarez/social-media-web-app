import { Avatar, Button, ConfigProvider, Dropdown, Modal } from "antd";
import React, { useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import "../../../styles/newPostModal.css";
import { FaRegImage } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const NewReplieModal = ({ isModalOpen, setIsModalOpen }) => {
  const { theme } = useTheme();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const emojiPicker = () => {
    return (
      <Picker
        data={data}
        onEmojiSelect={(emoji) => {
          //console.log(emoji.native);
          //setValue((prevValue) => prevValue + emoji.native);
        }}
        theme={theme}
      />
    );
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
        title="Drafts"
        open={isModalOpen}
        onCancel={handleCancel}
        width={580}
        style={{
          top: 15,
        }}
        footer={[
          <div
            className="new-post-footer-container"
            style={{ marginTop: 0, paddingTop: 0 }}
          >
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
              <Button type="primary">Reply</Button>
            </ConfigProvider>
          </div>,
        ]}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            //backgroundColor: "red",
            //marginTop: 30,
          }}
        >
          {/*Reply*/}
          <div className="comment-container replie-container">
            <Avatar icon={<UserOutlined />} size={40} />
            <div className="comment-container-info-box">
              <span>User Name @username DATE</span>

              <p className="comment-container-info-box-p">
                The Alchemist by Paulo Coelho. It taught me to trust my journey
                and never give up.
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              //backgroundColor: "pink",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              boxSizing: "border-box",
              paddingLeft: "25px",
            }}
          >
            <PiArrowBendDownRightBold
              style={{ fontSize: "30px", marginTop: "10px", color: "grey" }}
            />
            <div className="comment-container replie-container">
              <Avatar icon={<UserOutlined />} />
              <TextArea
                variant="borderless"
                placeholder="Post your reply"
                //style={{ height: "80px" }}
              />
            </div>
          </div>
          {/*Input*/}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default NewReplieModal;
