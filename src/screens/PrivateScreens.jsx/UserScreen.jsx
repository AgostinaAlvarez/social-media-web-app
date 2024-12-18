import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataById } from "../../data/api/userApi";
import { useSelector } from "react-redux";
import { getPosts } from "../../data/api/postApi";
import { Button, ConfigProvider, Switch } from "antd";
import { useTheme } from "../../context/ThemeContext";

const UserScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const token = useSelector((state) => state.authSlice.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [postsData, setPostsData] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const { userId } = params;
    getData(token, userId);
  }, []);

  const getData = async (token, userId) => {
    const { data: user_response, error: user_data_error } =
      await getUserDataById(token, userId);
    const { data: post_response, error: post_error } = await getPosts(
      token,
      userId
    );
    if (user_data_error) {
      setError(true);
    }

    if (post_error) {
      setPostError(true);
    }

    if (user_response) {
      setTimeout(() => {
        setUserData(user_response.user);
        setLoading(false);
      }, 1000);
    }
    if (post_response) {
      setTimeout(() => {
        /**
         * posts data:
         * 
          {
            "posts": [],
            "stats": {
              "currentPage": "1",
              "totalPosts": 0,
              "totalPages": 0
            }
          }
         * 
         */

        setPostsData(post_response);
        setLoadingPosts(false);
      }, 2000);
    }
  };

  const theme_button = {
    token: {
      /* here is your global tokens */
      colorBgContainer: "pink",
      /*
      colorPrimaryHover: "red",
      colorLinkActive: "red",
      colorPrimary: "red",
      */
    },
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {error ? (
            <div>Not found</div>
          ) : (
            <>
              <div className="home-screen-private-container">
                <div className="home-screen-feed">
                  <div className="user-screen">
                    {/*Header */}
                    <div className="user-screen-header">
                      <div className="user-screen-profile-image"></div>
                    </div>
                    {/*Informacion del usuario*/}
                    <div className="user-screen-info-container">
                      <div className="user-screen-info-box">
                        <span className="user-screen-info-box-name">
                          {userData.name} {userData.lastname}
                        </span>
                        <span className="user-screen-info-box-username">
                          @{userData.username}
                        </span>
                        <p className="user-screen-info-box-description">
                          Hola! Esta es una descripcion estandar del usuario
                        </p>
                        <div className="user-screen-info-box-data-container">
                          <div
                            className="user-screen-info-box-data"
                            //onClick={HandleOpenFriendModal}
                          >
                            <span className="user-screen-info-box-data-value">
                              1
                            </span>
                            <span className="user-screen-info-box-data-label">
                              Seguidores
                            </span>
                          </div>
                          <div className="user-screen-info-box-data">
                            <span className="user-screen-info-box-data-value">
                              20
                            </span>
                            <span className="user-screen-info-box-data-label">
                              Siguiendo
                            </span>
                          </div>
                          <div className="user-screen-info-box-data">
                            <span className="user-screen-info-box-data-value">
                              20
                            </span>
                            <span className="user-screen-info-box-data-label">
                              Posts
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <Button type="primary">Seguir</Button>
                        <ConfigProvider theme={theme_button}>
                          <Button
                            onClick={() => {
                              navigate(`/messages/inbox/${userData._id}`);
                            }}
                          >
                            Mensaje
                          </Button>
                        </ConfigProvider>
                      </div>
                    </div>
                  </div>

                  {/*
                    <div>User screen </div>
                    <div>
                      Username: {userData?.name} {userData?.lastname}
                    </div>
                    <div>
                      <div>POSTS:</div>
                      {loadingPosts ? (
                        <div>Loading posts... </div>
                      ) : (
                        <>
                          <div>Data de los posts:</div>
                        </>
                      )}
                    </div>
                    
                    */}
                </div>

                <div className="layout-private-aside">
                  <div>Otro aside</div>
                  <div>Modo oscuro</div>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "rgba(54,54,54,255)",
                      },
                      components: {
                        Switch: {
                          handleBg: "pink",
                        },
                      },
                    }}
                  >
                    <Switch
                    //onChange={onChange}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserScreen;
