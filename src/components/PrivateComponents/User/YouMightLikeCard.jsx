import { Avatar, Button, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const YouMightLikeCard = () => {
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
  return (
    <div className="recomendation-acounts-card">
      <span className="recomendation-acounts-card-ttl">You Might Like</span>
      {/***/}
      <>
        {loading ? (
          <Skeleton
            active
            loading={loading}
            avatar
            title={false} // Opcional, para evitar que aparezca un título por defecto
          ></Skeleton>
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

      <span className="recomendation-acounts-card-show-more">Show more</span>
    </div>
  );
};

export default YouMightLikeCard;
