import React from "react";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
const ProfileStatsCard = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-stats-card">
      <span className="profile-stats-card-ttl">Your Activity</span>
      <div
        className="profile-stats-card-item-container profile-stats-card-item-container-hover"
        onClick={() => {
          navigate("/profile/likes");
        }}
      >
        <FavoriteBorderIcon />
        <span>Likes {`(+100)`}</span>
      </div>

      <div
        onClick={() => {
          navigate("/profile/comments");
        }}
        className="profile-stats-card-item-container profile-stats-card-item-container-hover"
      >
        <ChatBubbleOutlineIcon />
        <span>Coments {`(20)`}</span>
      </div>
      <div
        className="profile-stats-card-item-container profile-stats-card-item-container-hover"
        onClick={() => {
          navigate("/profile/saved");
        }}
      >
        <BookmarkBorderIcon />
        <span>Saved {`(20)`}</span>
      </div>
    </div>
  );
};

export default ProfileStatsCard;
