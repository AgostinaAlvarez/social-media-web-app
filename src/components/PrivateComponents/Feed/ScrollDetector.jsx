import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const ScrollDetector = ({ children }) => {
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
      console.log("cargar contenido para ti..");
    }
    if (renderFollowingFeed === true) {
      console.log("cargar contenido de following...");
    }
  };

  return (
    <div
      className="home-screen-feed-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export default ScrollDetector;
