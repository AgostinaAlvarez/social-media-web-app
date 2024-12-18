import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/PublicScreens.jsx/LoginScreen";
import SignUpScreen from "../screens/PublicScreens.jsx/SignUpScreen";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
