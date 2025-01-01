import React, { useEffect, useState } from "react";
import FollowingDefaultScreen from "./FollowingDefaultScreen";

const FeedFollowing = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("feed en base a los usuarios seguidos");
  }, []);

  const followingListTest = [];

  return (
    <>
      <FollowingDefaultScreen />
    </>
  );
};

export default FeedFollowing;
