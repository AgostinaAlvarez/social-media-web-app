import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataById } from "../../data/api/userApi";
import { useSelector } from "react-redux";
import { getPosts } from "../../data/api/postApi";
import { Avatar, Button, ConfigProvider, Image, Switch } from "antd";
import { useTheme } from "../../context/ThemeContext";
import ProfileCard from "../../components/PrivateComponents/Home/ProfileCard";
import YouMightLikeCard from "../../components/PrivateComponents/User/YouMightLikeCard";
import { users_recomendation_3 } from "../../../tester_data";
import AntdSecondaryBtnComponent from "../../components/BasicComponents/AntdSecondaryBtnComponent";
import { PostFeedCard } from "../../components/PrivateComponents/Post/PostCard";

const UserScreen = () => {
  const params = useParams();
  const { userId } = params;
  const token = useSelector((state) => state.authSlice.token);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [postsData, setPostsData] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postError, setPostError] = useState(null);

  const data_posts = [
    {
      post: {
        id: "6772c6c075bc0944b24f2245",
        content:
          "The soundtrack of Interstellar is just pure perfection. Hans Zimmer really outdid himself with that one",
        createdAt: "2024-12-20T11:16:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2245",
        content:
          "Spent the entire afternoon debugging… only to realize it was a missing semicolon. Coding is pain and joy all at once. 😅",
        createdAt: "2024-12-28T18:14:30.511000",
      },
      stats: {
        likes: 25,
        comments: 4,
        saves: 0,
      },
      actions: {
        liked: true,
        saved: false,
      },
    },
    {
      post: {
        id: "6772c6c075bc0944b24f2246",
        content:
          "Just rewatched Inception and, honestly, I’m still wondering… was the top spinning or falling? What’s your take?",
        createdAt: "2024-12-26T21:07:30.511000",
      },
      stats: {
        likes: 29,
        comments: 7,
        saves: 2,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
    {
      post: {
        id: "6772c6c075bc0944b24f2248",
        content: (
          <div>
            Started The Last of Us last night and WOW. Pedro Pascal never
            misses, does he? 👏 What’s the next must-watch series on your list?{" "}
            <span style={{ color: "#4096ff" }}>#TheLastOfUs</span>
          </div>
        ),
        createdAt: "2024-12-23T16:22:30.511000",
      },
      stats: {
        likes: 68,
        comments: 16,
        saves: 13,
      },
      actions: {
        liked: true,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2249",
        content:
          "Finally finished Dune and I have so many thoughts. The world-building is insane! Sci-fi fans, what should I read next?",
        createdAt: "2024-12-22T17:32:30.511000",
        url: "https://miro.medium.com/v2/resize:fit:1400/1*XvnlvrVnaFlwfez3vyAYgg.jpeg",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: true,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2245",
        content: "If Ctrl+Z worked in real life, I’d be unstoppable. 💻😂",
        createdAt: "2024-12-21T10:38:30.511000",
      },
      stats: {
        likes: 27,
        comments: 4,
        saves: 0,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2223",
        content:
          "Books are like little portals to another universe. Some days, I’m solving mysteries in London, and others, I’m battling dragons.",
        createdAt: "2024-12-17T13:55:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
    {
      post: {
        id: "6772c6c075bc0944b24f2224",
        content: (
          <div>
            Music, a good book, and coffee on a rainy day. Simple things are
            what recharge me the most. ☕📖🎵{" "}
            <span style={{ color: "#4096ff" }}>#WeekendVibes</span>
          </div>
        ),
        createdAt: "2024-12-16T17:18:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2225",
        content:
          "Writing code that actually works on the first try feels like a miracle. It rarely happens, but when it does, it’s the best feeling.",
        createdAt: "2024-12-28T22:05:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2227",
        content:
          "Some movies are more than entertainment. They stick with you, making you think about life differently. Rewatching The Truman Show today reminded me of that.",
        createdAt: "2024-12-28T22:05:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2228",
        content:
          "Finishing a game with a great story feels just as satisfying as finishing a good book. Both take you on an unforgettable journey",
        createdAt: "2024-12-28T22:05:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },

    {
      post: {
        id: "6772c6c075bc0944b24f2228",
        content:
          "Debugging feels like trying to find a needle in a haystack that you accidentally set on fire",
        createdAt: "2024-12-28T22:05:30.511000",
      },
      stats: {
        likes: 59,
        comments: 12,
        saves: 24,
      },
      actions: {
        liked: false,
        saved: false,
      },
    },
  ];

  const transform_data_posts = (userData) => {
    const result = data_posts.map((item) => {
      return {
        ...item,
        user: { ...userData, avatar: userData?.avatar_img },
      };
    });

    return result;
  };

  const [testerPosts, setTesterPosts] = useState([]);

  useEffect(() => {
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
        console.log(user_response.user);
        setUserData(user_response.user);
        setTesterPosts(transform_data_posts(user_response.user));
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
                    <div
                      className="user-screen-header"
                      style={
                        userData.front_page_img === ""
                          ? { backgroundColor: "red" }
                          : {
                              backgroundImage: `url(${userData.front_page_img})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                      }
                    >
                      <div
                        className="user-screen-profile-image"
                        style={{ overflow: "hidden" }}
                      >
                        {userData.avatar_img === "" ? (
                          <></>
                        ) : (
                          <Image
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                            src={userData.avatar_img}
                          />
                        )}
                      </div>
                    </div>
                    {/*Informacion del usuario*/}
                    <div className="user-screen-info-container">
                      <div className="user-screen-info-box">
                        <span className="user-screen-info-box-name">
                          {userData.name} {userData.lastname}
                        </span>
                        <span className="info-username-lbl">
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
                              122
                            </span>
                            <span className="user-screen-info-box-data-label">
                              Followers
                            </span>
                          </div>
                          <div className="user-screen-info-box-data">
                            <span className="user-screen-info-box-data-value">
                              143
                            </span>
                            <span className="user-screen-info-box-data-label">
                              Following
                            </span>
                          </div>
                          <div className="user-screen-info-box-data">
                            <span className="user-screen-info-box-data-value">
                              58
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
                        <Button type="primary">Following</Button>
                        <AntdSecondaryBtnComponent
                          onClick={() => {
                            navigate(`/messages/inbox/${userData._id}`);
                          }}
                          theme={theme}
                          label={"Message"}
                        />
                      </div>
                    </div>
                    {/*Content*/}
                    <div className="post-list-container">
                      {/*Posts*/}
                      {testerPosts.map((item, index) => (
                        <PostFeedCard
                          item={item}
                          index={index}
                          HandleSelect={() => {
                            console.log("select");
                          }}
                          HandleOpenCommentsModal={() => {
                            console.log("handle open comments");
                          }}
                          HandleOpenLikesModal={() => {
                            console.log("handle open likes");
                          }}
                          stats={item.stats}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="layout-private-aside">
                  <ProfileCard />
                  <YouMightLikeCard users={users_recomendation_3} />
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
