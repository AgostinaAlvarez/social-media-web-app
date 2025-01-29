import { Avatar, Button, Skeleton, theme } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import SkeletonRecommendedUser from "../Skeletons/SkeletonRecommendedUser";
import RecommendedUsersModal from "./RecommendedUsersModal";
import AntdPrimaryBtnComponent from "../../BasicComponents/AntdPrimaryBtnComponent";
import { useTheme } from "../../../context/ThemeContext";

const YouMightLikeCard = ({ users }) => {
  const { theme } = useTheme();
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

  //You Might Like
  return (
    <>
      <div className="recomendation-acounts-card">
        <span className="recomendation-acounts-card-ttl">You Might Like</span>
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
                    {item.avatar ? (
                      <Avatar src={item.avatar} size={40} />
                    ) : (
                      <Avatar size={40} style={{ backgroundColor: "#4635B1" }}>
                        {item.name[0]}
                      </Avatar>
                    )}
                    <div className="recomendation-acounts-card-acount-name-container">
                      <span className="recomendation-acounts-card-acount-username info-name-lbl info-name-lbl">
                        {item.name} {item.lastname}
                      </span>
                      <span className="info-username-lbl info-username-lbl">
                        @{item.username}
                      </span>
                    </div>
                  </div>
                  <AntdPrimaryBtnComponent theme={theme} label={"Follow"} />
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

export default YouMightLikeCard;
