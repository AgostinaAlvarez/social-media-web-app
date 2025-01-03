import { Avatar, Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { PiArrowBendDownRightBold } from "react-icons/pi";

export const ReplyCardPostDetail = ({
  replie,
  index,
  replies_lenght,
  comment_id,
  current_replies_lenght,
  total_replies,
  current_replies,
  HandleRequestMoreReplies,
  loadingReplies,
}) => {
  const replies_lenght_nmbr = current_replies_lenght - 1;

  const spanRender = (count) => {
    if (count == 1) {
      return "reply";
    } else {
      return "replies";
    }
  };
  return (
    <div className="comment-container replie-container">
      <Avatar icon={<UserOutlined />} />
      <div className="comment-container-info-box">
        <div className="post-header-user-data-name">
          <span className="info-name-lbl">
            {replie.user.name} {replie.user.lastname}
          </span>
          <span className="info-username-lbl">@{replie.user.username}</span>
        </div>
        <span className="info-date-lbl">Wednesday, Oct 16, 6:02 PM</span>
        <p className="comment-container-info-box-p">{replie.reply.content}</p>
        {index === replies_lenght_nmbr &&
        current_replies_lenght !== total_replies ? (
          <>
            {loadingReplies.comment_id === comment_id &&
            loadingReplies.loading === true ? (
              <div className="comment-replie-loading-container">
                <Spin
                  //size="large"
                  indicator={<LoadingOutlined spin />}
                />
              </div>
            ) : (
              <div
                className="comment-container-replies-span"
                onClick={() => {
                  HandleRequestMoreReplies(
                    comment_id,
                    current_replies_lenght,
                    total_replies,
                    current_replies
                  );
                }}
              >
                <PiArrowBendDownRightBold />
                <span>
                  View {total_replies - current_replies_lenght} more{" "}
                  {spanRender(total_replies - current_replies_lenght)}
                </span>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
