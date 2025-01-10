import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";

const TesterScreen = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="save-container" onClick={handleSave}>
      <BsBookmarkFill className={`save-icon ${saved ? "saved" : ""}`} />
    </div>
  );
};

export default TesterScreen;
