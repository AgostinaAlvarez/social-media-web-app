import React, { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/themes.css";
import "./styles/app.css";
import { HandleVerifyAccess } from "./data/functions/authFunctions";
import { useDispatch } from "react-redux";
import AppRouter from "./router/AppRouter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    HandleVerifyAccess(dispatch);
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
