import React, { useEffect, useState } from "react";
import FollowingDefaultScreen from "./FollowingDefaultScreen";

const FeedFollowing = () => {
  useEffect(() => {
    console.log("feed en base a los usuarios seguidos");
  }, []);

  return (
    <>
      <FollowingDefaultScreen />
    </>
  );
};

export default FeedFollowing;
