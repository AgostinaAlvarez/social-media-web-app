import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../screens/LoadingScreen";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { ThemeProvider } from "../context/ThemeContext";
import { ImageCropProvider } from "../context/ImageCropContext";

const AppRouter = () => {
  const logged = useSelector((state) => state.authSlice.logged);
  const loading = useSelector((state) => state.authSlice.loading);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {logged === true ? (
            <ThemeProvider>
              <ImageCropProvider>
                <PrivateRoutes />
              </ImageCropProvider>
            </ThemeProvider>
          ) : (
            <PublicRoutes />
          )}
        </>
      )}
    </>
  );
};

export default AppRouter;
