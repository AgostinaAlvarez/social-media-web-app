import { Button, ConfigProvider, Switch } from "antd";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { setLogged } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    toggleTheme();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="home-screen-private-container">
        <div className="home-screen-feed">
          <div>Home screen</div>
        </div>
        <div className="layout-private-aside">
          <div>Otro aside</div>
          <Button
            onClick={() => {
              localStorage.clear();
              dispatch(setLogged(false));
              navigate("/signup");
            }}
          >
            Cerrar sesion
          </Button>
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
            <Switch onChange={onChange} />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
