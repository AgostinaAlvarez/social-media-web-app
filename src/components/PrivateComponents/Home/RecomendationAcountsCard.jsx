import React, { useEffect, useState } from "react";
import { Avatar, Button, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SkeletonRecommendedUser from "../Skeletons/SkeletonRecommendedUser";
import RecommendedUsersModal from "../User/RecommendedUsersModal";

const RecomendationAcountsCard = ({ users }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const users_tester = users.slice(0, 3);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="recomendation-acounts-card">
        <span className="recomendation-acounts-card-ttl">Who to follow</span>
        <>
          {loading ? (
            <>
              <SkeletonRecommendedUser />
              <SkeletonRecommendedUser />
            </>
          ) : (
            <>
              {users_tester.map((item) => (
                <div className="recomendation-acounts-card-acount-container">
                  <div className="recomendation-acounts-card-acount-info">
                    <Avatar icon={<UserOutlined />} />
                    <div className="recomendation-acounts-card-acount-name-container">
                      <span className="recomendation-acounts-card-acount-username info-name-lbl">
                        {item.name} {item.lastname}
                      </span>
                      <span className="info-username-lbl">
                        @{item.username}
                      </span>
                    </div>
                  </div>
                  <Button type="primary">Follow</Button>
                </div>
              ))}
            </>
          )}
        </>

        <span
          className="recomendation-acounts-card-show-more"
          onClick={showModal}
        >
          Show more
        </span>
      </div>
      <RecommendedUsersModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        users_tester={users}
      />
    </>
  );
};

export default RecomendationAcountsCard;
