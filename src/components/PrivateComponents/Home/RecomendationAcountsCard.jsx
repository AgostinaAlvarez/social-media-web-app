import React, { useEffect, useState } from "react";
import { Avatar, Button, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SkeletonRecommendedUser from "../Skeletons/SkeletonRecommendedUser";
import RecommendedUsersModal from "../User/RecommendedUsersModal";

const RecomendationAcountsCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const users_tester = [
    {
      username: "shirobladeX",
      name: "Shiro",
      lastname: "Blade",
      avatar: "",
      id: "1",
    },
    {
      username: "JuventusKing",
      name: "Fabio",
      lastname: "Ricci",
      avatar: "",
      id: "2",
    },
    {
      username: "FestivalFever_90",
      name: "Laura",
      lastname: "Martínez",
      avatar: "",
      id: "3",
    },
  ];

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
                      <span className="recomendation-acounts-card-acount-username">
                        {item.name} {item.lastname}
                      </span>
                      <span>@{item.username}</span>
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
      />
    </>
  );
};

export default RecomendationAcountsCard;
