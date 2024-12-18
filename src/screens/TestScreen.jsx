import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

const TestScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const logged = useSelector((state) => state.authSlice.logged);
  const loading = useSelector((state) => state.authSlice.loading);
  useEffect(() => {
    console.log("logged", logged);
  }, []);

  return (
    <>
      <div className="app">
        <div>
          {loading ? <p>Loading</p> : <p>Auth {logged ? "si" : "no"}</p>}
          <p>{theme === "light" ? "claro" : "oscuro"}.</p>
          <button onClick={toggleTheme}>Cambiar Tema</button>
        </div>
      </div>
    </>
  );
};

export default TestScreen;
