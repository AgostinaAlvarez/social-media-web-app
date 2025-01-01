import { Button } from "antd";
import React, { useState } from "react";
import RecommendedUsersModal from "../../../components/PrivateComponents/User/RecommendedUsersModal";

const FollowingDefaultScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="following-defaul-message-container">
        <span className="following-defaul-message-ttl">Welcome to App!</span>
        <p className="following-defaul-message-p">
          This is the best place to see what’s happening in your world. Find
          some people to follow now.
        </p>
        <Button type="primary" onClick={showModal}>
          Let's Go!
        </Button>
      </div>
      <RecommendedUsersModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default FollowingDefaultScreen;
