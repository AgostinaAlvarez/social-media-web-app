import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Spin,
} from "antd";
import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import "../../../styles/postComponent.css";
import { UserOutlined } from "@ant-design/icons";
import { FaRegImage } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";

const CommentsModal = ({
  isModalOpen,
  setIsModalOpen,
  handleOk,
  loadingCommentData,
}) => {
  const { theme } = useTheme();

  const handleCancel = () => {
    //reset values
    setIsModalOpen(false);
  };

  const comments = [1, 1, 1];

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
        style={{
          top: 25,
        }}
        width={700}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            width: "100%",
            //backgroundColor: "pink",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/*post*/}
          <div className="comment-container replie-container">
            <Avatar icon={<UserOutlined />} size={40} />
            <div className="comment-container-info-box">
              <div
                className="post-header-user-data-name"
                style={{ fontSize: 14 }}
              >
                <span className="info-name-lbl">User Name</span>
                <span className="info-username-lbl">@username</span>
                <span className="info-date-lbl" style={{ fontSize: 12 }}>
                  | Wednesday, Oct 16, 6:02 PM
                </span>
              </div>

              <p className="comment-container-info-box-p">
                The Alchemist by Paulo Coelho. It taught me to trust my journey
                and never give up.
              </p>
            </div>
          </div>
          {/*Comment section*/}
          <div
            style={{
              width: "100%",
              //backgroundColor: "pink",
              boxSizing: "border-box",
              padding: "0px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/*Input*/}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                //paddingTop: "10px",
                //borderTop: "1px solid grey",
                //backgroundColor: "red",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 10,
                }}
              >
                <Avatar icon={<UserOutlined />} />
                <TextArea
                  /*
                  placeholder="add a comment"
                  variant="borderless"
                  showCount
                  maxLength={120}
                  */
                  placeholder="add a comment"
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
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  boxSizing: "border-box",
                  gap: 20,
                  marginTop: 10,
                  //borderBottom: "1px solid grey",
                  padding: "10px 0px",
                }}
              >
                <div className="new-post-footer-icons-container">
                  <FaRegImage />
                  <MdInsertEmoticon />
                </div>
                <Button type="primary">Add Comment</Button>
              </div>
            </div>
            {/*coments list*/}
            <div className="comment-list">
              <>
                {/*a coment*/}
                <Divider />
                <span className="info-name-lbl">Comments</span>
                {loadingCommentData ? (
                  <div
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 0px",
                    }}
                  >
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
                ) : (
                  <>
                    {comments.map((item) => (
                      <div
                        className="comment-container"
                        style={{ border: "none" }}
                      >
                        <Avatar icon={<UserOutlined />} />
                        <div className="comment-container-info-box">
                          <div
                            className="post-header-user-data-name"
                            style={{ alignItems: "flex-end" }}
                          >
                            <span className="info-name-lbl">User name</span>
                            <span className="info-username-lbl">@username</span>
                            <span
                              className="info-date-lbl"
                              style={{ fontSize: "11px" }}
                            >
                              - Wednesday, Oct 16, 6:02 PM
                            </span>
                          </div>
                          <p
                            className="comment-container-info-box-p"
                            style={{ margin: "0px" }}
                          >
                            contenido del comentario
                          </p>

                          <div
                            style={{
                              width: "100%",
                              boxSizing: "border-box",
                              paddingTop: 7,
                            }}
                          >
                            <div className="post-content-input-container">
                              <Avatar icon={<UserOutlined />} />
                              <div className="post-content-input-box">
                                <Input
                                  variant="borderless"
                                  placeholder="reply to @username..."
                                />
                                <div className="post-content-input-box-icons-container">
                                  <FaRegImage />
                                  <MdInsertEmoticon />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/*Reply footer*/}
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "flex-end",
                              gap: 30,
                              marginBottom: 10,
                            }}
                          >
                            <div
                              className="comment-container-replies-span"
                              style={{ alignItems: "center" }}
                            >
                              <PiArrowBendDownRightBold />
                              <span>Reply comment</span>
                              <span className="comment-container-replies-span-value">
                                10
                              </span>
                            </div>
                          </div>
                          {/*Replys*/}
                          <div
                            className="comment-container"
                            style={{ border: "none" }}
                          >
                            <Avatar icon={<UserOutlined />} />
                            <div className="comment-container-info-box">
                              <div
                                className="post-header-user-data-name"
                                style={{ alignItems: "flex-end" }}
                              >
                                <span className="info-name-lbl">User name</span>
                                <span className="info-username-lbl">
                                  @username
                                </span>
                                <span
                                  className="info-date-lbl"
                                  style={{ fontSize: "11px" }}
                                >
                                  - Wednesday, Oct 16, 6:02 PM
                                </span>
                              </div>
                              <p
                                className="comment-container-info-box-p"
                                style={{ margin: "0px" }}
                              >
                                contenido del comentario
                              </p>
                              <div
                                className="comment-container-replies-span"
                                style={{ alignItems: "center" }}
                              >
                                <PiArrowBendDownRightBold />
                                <span>View 3 more replies</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default CommentsModal;
