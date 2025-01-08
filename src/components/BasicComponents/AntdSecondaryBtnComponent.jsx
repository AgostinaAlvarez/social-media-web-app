import { Button, ConfigProvider } from "antd";
import React from "react";

const AntdSecondaryBtnComponent = ({ label, theme, onClick, style }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: theme === "dark" ? "#121212" : "#ffffff",
          colorPrimaryHover: "#4096ff",
        },
      }}
    >
      <Button onClick={onClick} style={style}>
        {label}
      </Button>
    </ConfigProvider>
  );
};

export default AntdSecondaryBtnComponent;
