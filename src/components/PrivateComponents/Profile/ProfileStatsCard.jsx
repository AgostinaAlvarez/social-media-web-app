import React from "react";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const ProfileStatsCard = () => {
  return (
    <div className="profile-stats-card">
      <span className="profile-stats-card-ttl">Your Activity</span>
      <div className="profile-stats-card-item-container profile-stats-card-item-container-hover">
        <ChatBubbleOutlineIcon />
        <span>Coments {`(20)`}</span>
      </div>
      <div className="profile-stats-card-item-container profile-stats-card-item-container-hover">
        <BookmarkBorderIcon />
        <span>Saved {`(20)`}</span>
      </div>
      <div className="profile-stats-card-item-container profile-stats-card-item-container-hover">
        <FavoriteBorderIcon />
        <span>Likes {`(+100)`}</span>
      </div>
    </div>
  );
};

export default ProfileStatsCard;
