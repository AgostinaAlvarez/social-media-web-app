import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tester_feed_for_you } from "../../../../tester_data";
import {
  setFeedForYouPosts,
  setLoadingMoreFeedForYouPost,
} from "../../../slice/feedSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ScrollDetector = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const renderForYouFeed = useSelector(
    (state) => state.feedSlice.renderForYouFeed
  );

  const renderFollowingFeed = useSelector(
    (state) => state.feedSlice.renderFollowingFeed
  );

  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Comprobar si está en el borde inferior
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!isAtBottom) {
          /*
          console.log(
            "Estás en el borde inferior del scroll, desde el componente"
          );
          */
          console.log(
            "estas en el borde inferior del scroll, desde el componente"
          );

          setLoading(true);
          handleContentType();
          setIsAtBottom(true); // Marcar como alcanzado
        }
      } else {
        setIsAtBottom(false); // Reiniciar cuando no esté en el borde
      }
    }
  };

  const handleContentType = () => {
    if (renderForYouFeed === true) {
      HandleRequestMoreForYouPosts();
    }
    if (renderFollowingFeed === true) {
      console.log("cargar contenido de following...");
      setLoading(false);
    }
  };
  const feedForYouPosts = useSelector(
    (state) => state.feedSlice.feedForYouPosts
  );

  const HandleRequestMoreForYouPosts = () => {
    console.log("logica para pedir mas posts for you");
    const total_posts_lenght = tester_feed_for_you.length;
    const current_posts_lenght = feedForYouPosts.length;
    const limit = 5;
    console.log("total posts lenght: ", total_posts_lenght);
    console.log("current posts lenght: ", current_posts_lenght);
    if (total_posts_lenght !== current_posts_lenght) {
      console.log("cargar mas");

      const nextPosts = tester_feed_for_you.slice(
        current_posts_lenght,
        current_posts_lenght + limit
      );

      const update_posts = [...feedForYouPosts, ...nextPosts];

      setTimeout(() => {
        dispatch(setFeedForYouPosts(update_posts));
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      className="home-screen-feed-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {children}
      {loading ? (
        <div className="feed-loader-container">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <div className="feed-loader-defaul">Empty</div>
      )}
    </div>
  );
};

export default ScrollDetector;
