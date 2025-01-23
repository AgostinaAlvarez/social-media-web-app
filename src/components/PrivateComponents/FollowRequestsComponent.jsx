import { Avatar, notification } from "antd";
import React, { useState } from "react";
import AntdPrimaryBtnComponent from "../BasicComponents/AntdPrimaryBtnComponent";
import { useTheme } from "../../context/ThemeContext";
import AntdSecondaryBtnComponent from "../BasicComponents/AntdSecondaryBtnComponent";
import { UserOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { incrementFollowers } from "../../slice/statsSlice";

const FollowRequestsComponent = () => {
  const test = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const requests_data = [
    {
      username: "masoncollins",
      name: "Mason",
      lastname: "Collins",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1721636524448440320/akSETLm7_400x400.jpg",
    },
    {
      username: "ava_stewart",
      name: "Ava",
      lastname: "Stewart",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1755389553517514752/Iof5imFo_400x400.jpg",
    },
    {
      username: "jackson.morris12",
      name: "Jackson",
      lastname: "Morris",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1817938969016840192/2kEqV4mT_400x400.jpg",
    },
    {
      username: "lily-reed",
      name: "Lily",
      lastname: "Reed",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1877392256354627591/HU1qJ-h4_400x400.jpg",
    },
    {
      username: "cartermurphy02",
      name: "Carter",
      lastname: "Murphy",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1568234905603121152/7KnH88Xt_400x400.jpg",
    },
    {
      username: "gracebaileyy",
      name: "Grace",
      lastname: "Bailey",
      loading: false,
      avatar:
        "https://pbs.twimg.com/media/Gh7kmnmXAAAH2gc?format=jpg&name=small",
    },
    {
      username: "levi__parker",
      name: "Levi",
      lastname: "Parker",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1856375615907098624/N1jDEYz-_400x400.jpg",
    },
    {
      username: "charlotte.bell",
      name: "Charlotte",
      lastname: "Bell",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1874866680142159872/o-l037lA_400x400.jpg",
    },
    {
      username: "ameliaclark",
      name: "Amelia",
      lastname: "Clark",
      loading: false,
    },
    {
      username: "loganwalker_",
      name: "Logan",
      lastname: "Walker",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1613533634991906819/QgzF9HhV_400x400.jpg",
    },
    {
      username: "_sophiayoung",
      name: "Sophia",
      lastname: "Young",
      loading: false,
      avatar:
        "https://pbs.twimg.com/profile_images/1771091617119649792/1WK8yB_C_400x400.jpg",
    },
    {
      username: "mia.allen",
      name: "Mia",
      lastname: "Allen",
      avatar:
        "https://pbs.twimg.com/profile_images/1873117057958494208/yBeykD7N_400x400.jpg",
      loading: false,
    },
    {
      username: "elijahscott",
      name: "Elijah",
      lastname: "Scott",
      loading: false,
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (item) => {
    api.open({
      message: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 10,
            alignItems: "flex-start",
            fontSize: 14,
          }}
        >
          <div
            style={{
              height: 35,
              width: 35,
              backgroundColor: "red",
              borderRadius: "50%",
              backgroundImage: `url(${item.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 5 }}>
              <span>
                {item.name} {item.lastname}
              </span>{" "}
              <span className="info-username-lbl">@{item.username}</span>
            </div>
            <span>has started following you</span>
          </div>
        </div>
      ),
    });
  };

  const counter = 23;
  const [requests, setRequests] = useState(requests_data);

  const HandleAcceptFollowRequest = (item, username) => {
    const updateRequests = requests.map((item) => {
      if (item.username === username) {
        return { ...item, loading: true };
      }
      return item;
    });

    setRequests(updateRequests);

    const finalRequests = requests.filter((item) => item.username !== username);

    setTimeout(() => {
      setRequests(finalRequests);
      openNotification(item);
      dispatch(incrementFollowers());
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <div className="follow-requests-component-container">
        <div className="follow-requests-component-header">
          <div className="follow-requests-component-header-ttl">
            <Avatar
              size={30}
              style={{ border: "1px solid #8a8a8a76" }}
              icon={<FaUserPlus />}
            />

            <span>Follow Requests (23)</span>
          </div>
          <div className="follow-requests-go-back-container">
            <IoIosArrowBack />
            <span>Notifications</span>
          </div>
        </div>
        <div className="follow-requests-component-list-container">
          {requests.map((item) => (
            <div className="follow-requests-component-item-container">
              <div className="follow-requests-component-item-userdata">
                {item.avatar ? (
                  <Avatar size={34} src={item.avatar} />
                ) : (
                  <Avatar size={34} style={{ backgroundColor: "#4635B1" }}>
                    {item.name[0].toUpperCase()}
                  </Avatar>
                )}
                <div className="follow-requests-component-item-userdata-username">
                  <span>
                    {item.name} {item.lastname}
                  </span>
                  <span>@{item.username}</span>
                </div>
              </div>
              <div className="follow-requests-component-item-btn-container">
                <AntdPrimaryBtnComponent
                  label={"Accept"}
                  theme={theme}
                  loading={item.loading}
                  onClick={() => {
                    HandleAcceptFollowRequest(item, item.username);
                  }}
                  style={{ border: "none", fontSize: 12 }}
                />
                <AntdSecondaryBtnComponent
                  label={"Decline"}
                  theme={theme}
                  style={{
                    border: "none",
                    border: `1px solid ${
                      theme === "dark" ? "#8a8a8a76" : "#a7a7a771"
                    }`,
                    fontSize: 12,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FollowRequestsComponent;
