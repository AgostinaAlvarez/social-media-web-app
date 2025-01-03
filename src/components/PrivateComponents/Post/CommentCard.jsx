import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PiArrowBendDownRightBold } from "react-icons/pi";

export const CommentCardPostDetail = ({
  children,
  item,
  HandleOpenReplyModal,
  HandleRequestReplies,
}) => {
  return (
    <div className="comment-container">
      <Avatar icon={<UserOutlined />} />
      <div className="comment-container-info-box">
        <div className="post-header-user-data-name">
          <span className="info-name-lbl">
            {item.user.name} {item.user.lastname}
          </span>
          <span className="info-username-lbl">@{item.user.username}</span>
        </div>
        <span className="info-date-lbl">Wednesday, Oct 16, 6:02 PM</span>
        <p className="comment-container-info-box-p">{item.comment.content}</p>
        {item.stats.replies === 0 ? (
          <div className="comment-replies-footer-no-replies-found">
            <div
              className="post-content-footer-stats-item post-content-footer-stats-value comment-replies-footer-add-reply-lbl"
              onClick={HandleOpenReplyModal}
            >
              <span>+ Add Replie</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        {item.stats.replies > 0 ? (
          <>
            <div className="comment-replies-footer-replies-found">
              <div
                className="comment-container-replies-span"
                onClick={() => {
                  HandleRequestReplies(
                    item.comment.id,
                    item.replies.length,
                    item.stats.replies,
                    item.replies
                  );
                }}
              >
                <PiArrowBendDownRightBold />
                <span>Reply comment</span>
                <span className="comment-container-replies-span-value">
                  {item.stats.replies}
                </span>
              </div>
              <div
                className="post-content-footer-stats-item post-content-footer-stats-value comment-replies-footer-add-reply-lbl"
                onClick={HandleOpenReplyModal}
              >
                <span>+ Add Replie</span>
              </div>
            </div>
            {children}
            <></>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
